// React
import {useContext, useEffect, useState} from "react";

// Context
import {AuthContext} from "../../../context/AuthContext.jsx";

// Components
import StableTable from "../../../components/page-components/stalbezetting/StableTable/StableTable.jsx";

// Services
import {getUserBoxes, deleteBox, createBox} from "../../../services/boxService.js";

import {getAllPersons} from "../../../services/contactService.js";

import {updateHorseRelations, getAllHorses} from "../../../services/horseService.js";

// CSS
import './Stalbezetting.css'

function Stalbezetting() {

    const {token, user} = useContext(AuthContext);
    const [capacity, setCapacity] = useState("");
    const [boxes, setBoxes] = useState([]);
    const [horses, setHorses] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [movingHorse, setMovingHorse] = useState(null);

    const [isLoadingHorses, setIsLoadingHorses] = useState(false);
    const [horsesError, setHorsesError] = useState("");

    const [isLoadingBoxes, setIsLoadingBoxes] = useState(false);
    const [boxesError, setBoxesError] = useState("");

    const [isSavingBoxes, setIsSavingBoxes] = useState(false);
    const [saveBoxesError, setSaveBoxesError] = useState("");

    const [isDeletingAllBoxes, setIsDeletingAllBoxes] = useState(false);
    const [deleteAllBoxesError, setDeleteAllBoxesError] = useState("");

    const [movingHorseId, setMovingHorseId] = useState(null);
    const [removingHorseId, setRemovingHorseId] = useState(null);
    const [moveHorseError, setMoveHorseError] = useState("");

    const [changingBoxHorseId, setChangingBoxHorseId] = useState(null);
    const [dateUpdateError, setDateUpdateError] = useState("");
    const [isUpdatingDate, setIsUpdatingDate] = useState(false);

    function handleCapacityChange(e) {
        setCapacity(Number(e.target.value));
    }

    useEffect(() => {
        async function fetchHorsesAndContacts() {
            try {
                setIsLoadingHorses(true);
                setHorsesError("");

                const horsesData = await getAllHorses(token);
                setHorses(horsesData);

                const contactsData = await getAllPersons(token);
                setContacts(contactsData);

            } catch (error) {
                console.error("Fout bij ophalen paarden/contacten:", error);
                setHorsesError("Het ophalen van paarden en contacten is mislukt.");
            } finally {
                setIsLoadingHorses(false);
            }
        }

        if (token) {
            fetchHorsesAndContacts();
        }
    }, [token]);

    useEffect(() => {
        async function fetchBoxes() {
            try {
                setIsLoadingBoxes(true);
                setBoxesError("");

                const userBoxes = await getUserBoxes(user.id, token);

                setBoxes(userBoxes);
                setCapacity(userBoxes.length);

            } catch (error) {
                console.error("Fout bij ophalen boxen:", error);
                setBoxesError("Het ophalen van de boxen is mislukt.");
            } finally {
                setIsLoadingBoxes(false);
            }
        }

        if (token) {
            fetchBoxes();
        }

    }, [token, user]);

    async function generateBoxes() {
        try {
            setIsSavingBoxes(true);
            setSaveBoxesError("");
            const existingBoxes = await getUserBoxes(user.id, token);

            const occupiedBoxesAfterCapacity = existingBoxes.filter(box =>
                box.boxNumber > capacity &&
                horses.some(horse =>
                    Number(horse.boxId) === Number(box.id)
                )
            );

            if (occupiedBoxesAfterCapacity.length > 0) {

                const occupiedBoxNumbers = occupiedBoxesAfterCapacity
                    .map(box => box.boxNumber)
                    .join(", ");

                alert(
                    `Kan capaciteit niet verlagen. De volgende boxen bevatten nog paarden: ${occupiedBoxNumbers}. Verplaats of koppel eerst deze paarden los.`
                );

                return;
            }

            const boxesToDelete = existingBoxes.filter(
                box => box.boxNumber > capacity
            );

            for (const box of boxesToDelete) {
                await deleteBox(box.id, token);
            }

            for (let i = 1; i <= capacity; i++) {

                const exists = existingBoxes.some(
                    box => box.boxNumber === i
                );

                if (!exists) {
                    await createBox(user.id, i, token);
                }
            }

            const updatedBoxes = await getUserBoxes(user.id, token);

            setBoxes(updatedBoxes);

        } catch (error) {
            console.error(error.response?.data || error);
            setSaveBoxesError("Het opslaan van de boxen is mislukt.");
        } finally {
            setIsSavingBoxes(false);
        }
    }

    async function deleteAllBoxes() {

        const confirmReset = window.confirm(
            "Resetten van de boxen betekent dat alle paarden in de toegewezen boxen verloren gaan. Dit is onomkeerbaar. \n Weet je zeker dat je de boxen wil resetten?"
        );

        if (!confirmReset) {
            return;
        }

        try {
            setIsDeletingAllBoxes(true);
            setDeleteAllBoxesError("");
            for (const horse of horses) {
                if (horse.boxId) {
                    await updateHorseRelations(
                        horse.id,
                        {boxId: null},
                        token
                    );
                }
            }

            const userBoxes = await getUserBoxes(user.id, token);

            for (const box of userBoxes) {
                await deleteBox(box.id, token);
            }

            setBoxes([]);

            setHorses(prevHorses =>
                prevHorses.map(horse => ({
                    ...horse,
                    boxId: null
                }))
            );

            setCapacity("");

        } catch (error) {
            console.error(error.response?.data || error);
            setDeleteAllBoxesError("Het resetten van de boxen is mislukt.");
        } finally {
            setIsDeletingAllBoxes(false);
        }
    }

    async function fromBoxToPasture(horse) {
        try {
            setMovingHorseId(horse.id);
            setMoveHorseError("");
            await updateHorseRelations(
                horse.id,
                {location: "wei"},
                token
            );

            setHorses(prevHorses =>
                prevHorses.map(h =>
                    h.id === horse.id
                        ? {...h, location: "wei"}
                        : h
                )
            );

        } catch (error) {
            console.error(error);
            setMoveHorseError("Het verplaatsen van het paard naar de wei is mislukt.");
        } finally {
            setMovingHorseId(null);
        }
    }

    async function fromPastureToBox(horse) {
        try {
            setMovingHorseId(horse.id);
            setMoveHorseError("");
            await updateHorseRelations(
                horse.id,
                {location: "stal", boxId: horse.boxId},
                token
            );

            setHorses(prevHorses =>
                prevHorses.map(h =>
                    h.id === horse.id
                        ? {...h, location: "stal"}
                        : h
                )
            );

        } catch (error) {
            console.error(error);
            setMoveHorseError("Het verplaatsen van het paard naar de stal is mislukt.");
        } finally {
            setMovingHorseId(null);

        }
    }

    async function placeHorseInBox(horseId, boxId) {
        try {
            setMovingHorseId(Number(horseId));
            setMoveHorseError("");

            await updateHorseRelations(
                horseId,
                {
                    boxId: Number(boxId),
                    location: "stal"
                },
                token
            );

            setHorses(prevHorses =>
                prevHorses.map(h =>
                    h.id === Number(horseId)
                        ? {
                            ...h,
                            boxId: Number(boxId),
                            location: "stal"
                        }
                        : h
                )
            );

        } catch (error) {
            console.error("Paard plaatsen mislukt:", error);
            setMoveHorseError("Het plaatsen van het paard in de box is mislukt.");
        } finally {
            setMovingHorseId(null);
        }
    }

    async function moveHorseToBox(horse, newBoxId) {
        try {
            setChangingBoxHorseId(horse.id);
            setMoveHorseError("");

            await updateHorseRelations(
                horse.id,
                {boxId: Number(newBoxId)},
                token
            );

            setHorses(prev =>
                prev.map(h =>
                    h.id === horse.id
                        ? {...h, boxId: Number(newBoxId)}
                        : h
                )
            );

            setMovingHorse(null);

        } catch (error) {
            console.error("Paard verplaatsen mislukt:", error);
            setMoveHorseError("Het verplaatsen naar de andere box is mislukt.");
        } finally {
            setChangingBoxHorseId(null);
        }
    }

    async function removeHorseFromBox(horse) {
        try {
            setRemovingHorseId(horse.id);
            setMoveHorseError("");

            await updateHorseRelations(
                horse.id,
                {boxId: null},
                token
            );

            setHorses(prevHorses =>
                prevHorses.map(h =>
                    h.id === horse.id
                        ? {...h, boxId: null}
                        : h
                )
            );

        } catch (error) {
            console.error("Paard loskoppelen mislukt:", error);
            setMoveHorseError("Het loskoppelen van het paard is mislukt.");
        } finally {
            setRemovingHorseId(null);
        }
    }

    async function updateHorseDates(horse, field, value) {

        const today = new Date().toISOString().split("T")[0];

        if (field === "boxEndDate" && value < today) {
            alert("Einddatum mag niet eerder zijn dan vandaag.");
            return;
        }

        if (
            field === "boxEndDate" &&
            horse.boxStartDate &&
            value < horse.boxStartDate
        ) {
            alert("Einddatum mag niet vóór de startdatum liggen.");
            return;
        }

        try {
            setIsUpdatingDate(true);
            setDateUpdateError("");
            await updateHorseRelations(
                horse.id,
                {[field]: value},
                token
            );

            setHorses(prev =>
                prev.map(h =>
                    h.id === horse.id
                        ? {
                            ...h,
                            [field]: value
                        }
                        : h
                )
            );

        } catch (error) {
            console.error("Datum aanpassen mislukt:", error);
            setDateUpdateError("Het aanpassen van de datum is mislukt.");
        } finally {
            setIsUpdatingDate(false);
        }
    }

    return (
        <div className="stalbezetting-page">
            <h1>Stalbezetting</h1>
            {isLoadingHorses && <p>Paarden en contacten worden geladen...</p>}

            {horsesError && (
                <p className="error-message">{horsesError}</p>
            )}

            {isLoadingBoxes && <p>Boxen worden geladen...</p>}

            {boxesError && (
                <p className="error-message">{boxesError}</p>
            )}
            <label htmlFor="box-capacity">
                Hoeveel boxen heb je nodig?
            </label>
            <input
                id="box-capacity"
                type="number"
                min="1"
                max="100"
                value={capacity}
                onChange={handleCapacityChange}
            />

            <button
                type="button"
                onClick={generateBoxes}
                disabled={isSavingBoxes}>
                {isSavingBoxes ? "Bezig met opslaan..." : "Opslaan"}
            </button>
            {saveBoxesError && (
                <p className="error-message">{saveBoxesError}</p>
            )}
            <button
                type="button"
                onClick={deleteAllBoxes}
                disabled={isDeletingAllBoxes}>
                {isDeletingAllBoxes ? "Bezig met resetten..." : "Reset boxen"}
            </button>
            {deleteAllBoxesError && (
                <p className="error-message">{deleteAllBoxesError}</p>
            )}

            {moveHorseError && (
                <p className="error-message">{moveHorseError}</p>
            )}
            {isUpdatingDate && (
                <p>Datum wordt opgeslagen...</p>
            )}

            {dateUpdateError && (
                <p className="error-message">{dateUpdateError}</p>
            )}
            <StableTable
                boxes={boxes}
                horses={horses}
                contacts={contacts}
                fromBoxToPasture={fromBoxToPasture}
                fromPastureToBox={fromPastureToBox}
                setHorses={setHorses}
                placeHorseInBox={placeHorseInBox}
                removeHorseFromBox={removeHorseFromBox}
                moveHorseToBox={moveHorseToBox}
                setMovingHorse={setMovingHorse}
                movingHorse={movingHorse}
                updateHorseDates={updateHorseDates}
                movingHorseId={movingHorseId}
                removingHorseId={removingHorseId}
                changingBoxHorseId={changingBoxHorseId}
            />
        </div>
    );
}

export default Stalbezetting;