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

                setBoxes(
                    response.data.filter(box => box.userId === user?.id))

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


            // TE VEEL BOXEN VERWIJDEREN
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
        try {

            await api.patch(
                `/horses/${horse.id}`,
                {
                    location: "wei"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setHorses(prevHorses =>
                prevHorses.map(horse =>
                    horse.id === horse.id
                        ? { ...horse, location: "wei" }
                        : horse
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
                prevHorses.map(horse =>
                    horse.id === horse.id
                        ? { ...horse, location: "stal" }
                        : horse
                )
            );

        } catch(error) {
            console.error(error);
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

                />
            </div>
        </>
    );
}

export default Stalbezetting;