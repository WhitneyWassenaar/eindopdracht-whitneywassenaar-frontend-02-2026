import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../authentication/context/AuthContext.jsx";
import api from "../../../../api/axios.js";
import HorseHealthForm from "../../../forms/HorseHealthForm/HorseHealthForm.jsx";

function HorseHealth({horse}) {

    const {token} = useContext(AuthContext);
    const [health, setHealth] = useState(null);

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

    return (
        <div>
            <h2>
                Gezondheid
            </h2>

            {health ? (
                <p>
                    Gewicht: {health.weight} kg
                </p>
            ) : (
                <p>
                    Nog geen gezondheidsgegevens.
                </p>
            )}
            <HorseHealthForm
            horse={horse}/>
        </div>
    );
}


export default HorseHealth;