// React
import {useContext, useEffect, useState} from "react";

// Components
import StableTable from "../../../components/page-components/stalbezetting/StableTable/StableTable.jsx";

// CSS
import './Stalbezetting.css'
import api from "../../../api/axios.js";
import {AuthContext} from "../../../components/authentication/context/AuthContext.jsx";


function Stalbezetting() {

    const {token,user} = useContext(AuthContext);
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
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                const horsesResponse = await api.get("/horses", { headers });

                console.log("PAARDEN UIT API:", horsesResponse.data);
                setHorses(horsesResponse.data);

                const contactsResponse = await api.get("/persons", { headers });
                setContacts(contactsResponse.data);

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
                const response = await api.get("/boxes", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userBoxes = response.data.filter(
                    box => box.userId === user?.id
                );

                setBoxes(userBoxes);
                setCapacity(userBoxes.length);

            } catch (error) {
                console.error("Fout bij ophalen boxen:", error);
            }
        }

        if (token) {
            fetchBoxes();
        }

    }, [token]);

    async function generateBoxes() {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };

            // huidige boxen ophalen
            const boxResponse = await api.get("/boxes", {
                headers
            });

            const existingBoxes = boxResponse.data.filter(
                box => box.userId === user?.id
            );

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
                await api.delete(`/boxes/${box.id}`, {
                    headers
                });
            }


            // ONTBREKENDE BOXEN MAKEN
            for (let i = 1; i <= capacity; i++) {

                const exists = existingBoxes.some(
                    box => box.boxNumber === i
                );

                if (!exists) {
                    await api.post("/boxes",
                        {
                            userId: user.id,
                            boxNumber: i
                        },
                        {
                            headers
                        }
                    );
                }
            }


            // nieuwe lijst ophalen
            const updatedBoxes = await api.get("/boxes", {
                headers
            });

            setBoxes(
                updatedBoxes.data.filter(box => box.userId === user?.id)
            );

        } catch (error) {
            console.error(error.response?.data || error);
        }
    }

    async function deleteAllBoxes() {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await api.get("/boxes", { headers });

            for (const box of response.data) {
                await api.delete(`/boxes/${box.id}`, { headers });
            }

            setBoxes([]);

        } catch (error) {
            console.error(error.response?.data || error);
        }
    }

    async function fromBoxToPasture(horse) {
        console.log("NAAR WEI:", horse);

        console.log("PAARD ID:", horse.id);
        console.log("PAARD NAAM:", horse.name);

        try {

            const response = await api.patch(`/horses/${horse.id}`,
                {
                    location: "wei"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("BACKEND RESPONSE:", response.data);

            console.log("RESPONSE ID:", response.data.id);
            console.log("RESPONSE NAAM:", response.data.name);
            console.log("RESPONSE LOCATION:", response.data.location);

            setHorses(prevHorses =>
                prevHorses.map(h =>
                    h.id === horse.id
                        ? { ...h, location: "wei" }
                        : h
                )
            );

        } catch(error) {
            console.error(error);
        }
    }

    async function fromPastureToBox(horse) {
        try {
            await api.patch(`/horses/${horse.id}`,
                {
                    boxId: horse.boxId,
                    location: "stal"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setHorses(prevHorses =>
                prevHorses.map(h =>
                    h.id === horse.id
                        ? { ...h, location: "stal" }
                        : h
                )
            );

        } catch(error) {
            console.error(error);
        }
    }

    async function placeHorseInBox(horseId, boxId) {
        try {
            await api.patch(`/horses/${horseId}`, {
                boxId: Number(boxId),
                location: "stal"
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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

        await api.patch(`/horses/${horse.id}`,
            {
                boxId: Number(newBoxId)
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        setHorses(prev =>
            prev.map(h =>
                h.id === horse.id
                    ? {...h, boxId:Number(newBoxId)}
                    : h
            )
        );

        setMovingHorse(null);
    }

    async function removeHorseFromBox(horse) {
        try {
            await api.patch(`/horses/${horse.id}`, {
                boxId: null
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setHorses(prevHorses =>
                prevHorses.map(h =>
                    h.id === horse.id
                        ? {
                            ...h,
                            boxId: null
                        }
                        : h
                )
            );

        } catch(error) {
            console.error("Paard loskoppelen mislukt:", error);
        }
    }


    return (
        <>
            <div className="stalbezetting-page">
                <h1>Stalbezetting</h1>

                <label>
                    Hoeveel boxen heb je nodig?
                </label>

                <input
                    type="number"
                    min="1"
                    max="100"
                    value={capacity}
                    onChange={handleCapacityChange}
                />

                <button onClick={generateBoxes}>
                    Opslaan
                </button>
                <button onClick={deleteAllBoxes}>
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

                />
            </div>
        </>
    );
}

export default Stalbezetting;