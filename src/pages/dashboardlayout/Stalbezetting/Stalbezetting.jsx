// React
import {useContext, useState} from "react";

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

    async function generateBoxes() {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };

            // huidige boxen ophalen
            const boxResponse = await api.get("/boxes", {
                headers
            });

            const existingBoxes = boxResponse.data;

            // alleen nieuwe boxen maken
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
                        });
                }
            }

            // opnieuw ophalen voor tabel
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
                />
            </div>
        </>
    );
}

export default Stalbezetting;