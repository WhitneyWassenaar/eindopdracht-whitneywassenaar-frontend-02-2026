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

    function handleCapacityChange(e) {
        setCapacity(Number(e.target.value));
    }

    useEffect(() => {
        async function fetchHorsesAndContacts() {
            try {
                const horsesData = await getAllHorses(token);
                setHorses(horsesData);

                const contactsData = await getAllPersons(token);
                setContacts(contactsData);

            } catch (error) {
                console.error("Fout bij ophalen paarden/contacten:", error);
            }
        }

        if (token) {
            fetchHorsesAndContacts();
        }
    }, [token]);

    useEffect(() => {
        async function fetchBoxes() {
            try {
                const userBoxes = await getUserBoxes(user.id, token);

                setBoxes(userBoxes);
                setCapacity(userBoxes.length);

            } catch (error) {
                console.error("Fout bij ophalen boxen:", error);
            }
        }

        if (token) {
            fetchBoxes();
        }

    }, [token, user]);

    async function generateBoxes() {
        try {
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
        }
    }

    async function fromBoxToPasture(horse) {
        try {

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
        }
    }

    async function fromPastureToBox(horse) {
        try {
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
        }
    }

    async function placeHorseInBox(horseId, boxId) {
        try {
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
        }
    }

    async function moveHorseToBox(horse, newBoxId) {
        try {
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
        }
    }

    async function removeHorseFromBox(horse) {
        try {
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
        }
    }

    return (
        <div className="stalbezetting-page">
            <h1>Stalbezetting</h1>
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
                onClick={generateBoxes}>
                Opslaan
            </button>
            <button
                type="button"
                onClick={deleteAllBoxes}>
                Reset boxen
            </button>

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
            />
        </div>
    );
}

export default Stalbezetting;