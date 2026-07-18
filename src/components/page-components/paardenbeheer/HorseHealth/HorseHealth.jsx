// React
import {useContext, useEffect, useState} from "react";

// Components
import HorseHealthForm from "../../../forms/HorseHealthForm/HorseHealthForm.jsx";

// Context / Hooks
import {AuthContext} from "../../../authentication/context/AuthContext.jsx";

// Api
import api from "../../../../api/axios.js";

function HorseHealth({horse}) {

    const {token} = useContext(AuthContext);
    const [health, setHealth] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if(!horse || !token) return;

        async function getHealth(){
            try {

                const response = await api.get(`/horses/${horse.id}/horseHealths`,
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

                console.log("Health:", response.data);
                setHealth(response.data[0] || null);

            } catch(error){
                console.error(error);
            }
        }
        getHealth();

    }, [horse, token]);

    async function reloadHealth() {
        try {
            const response = await api.get(`/horses/${horse.id}/horseHealths`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            setHealth(response.data[0] || null);
            setShowForm(false);


        } catch(error){
            console.error(error);
        }
    }

    return (
        <div>
            <h2>
                Gezondheid
            </h2>


            {!health && !showForm && (

                <button
                    onClick={() => setShowForm(true)}
                >
                    Vul gezondheidsgegevens in
                </button>

            )}


            {showForm && (

                <HorseHealthForm
                    horse={horse}
                    onSaved={reloadHealth}
                />

            )}


            {health && !showForm && (

                <div className="health-overview">

                    <p>
                        Gewicht: {health.weight} kg
                    </p>

                    <p>
                        Dieet: {health.diet || "Geen dieet ingevuld"}
                    </p>

                    <p>
                        Allergieën: {health.allergies || "Geen allergieën"}
                    </p>

                    <p>
                        Medicatie: {health.medication || "Geen medicatie"}
                    </p>

                    <p>
                        Vaccinatie:
                        {health.vaccinated ? " Ja" : " Nee"}
                    </p>

                    <p>
                        Laatste ontworming:
                        {health.lastDeworming || "Niet ingevuld"}
                    </p>

                    <p>
                        Bijzonderheden:
                        {health.notes || "Geen bijzonderheden"}
                    </p>


                    <button
                        onClick={() => setShowForm(true)}
                    >
                        Wijzigen
                    </button>

                </div>

            )}

        </div>
    );
}


export default HorseHealth;