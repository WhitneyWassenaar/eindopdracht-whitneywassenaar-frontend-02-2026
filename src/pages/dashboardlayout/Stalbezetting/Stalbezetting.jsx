// React
import {useContext, useEffect, useState} from "react";

// Components
import StableTable from "../../../components/page-components/stalbezetting/StableTable/StableTable.jsx";

// CSS
import './Stalbezetting.css'
import api from "../../../api/axios.js";
import {AuthContext} from "../../../components/authentication/context/AuthContext.jsx";


function Stalbezetting({horses, contacts}) {
    const {token,user} = useContext(AuthContext);
    const [capacity, setCapacity] = useState("");
    const [boxes, setBoxes] = useState([]);


    function handleCapacityChange(e) {
        setCapacity(Number(e.target.value));
    }

    console.log("User:", user);
    console.log("Token:", token);
    console.log("Capacity:", capacity);

    useEffect(() => {
        async function fetchBoxes() {
            try {
                const response = await api.get("/boxes", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setBoxes(response.data);

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
                box => box.userId === user.id
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

            setBoxes(updatedBoxes.data);

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

            console.log("Alle boxen verwijderd");

        } catch (error) {
            console.error(error.response?.data || error);
        }
    }

    async function moveHorseToPasture(horse) {
        try {

            await api.patch(
                `/horses/${horse.id}`,
                {
                    boxId: null,
                    location: "wei"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Paard naar wei:", horse.name);

            window.location.reload();

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
                updateHorse={moveHorseToPasture}
                />
            </div>
        </>
    );
}

export default Stalbezetting;