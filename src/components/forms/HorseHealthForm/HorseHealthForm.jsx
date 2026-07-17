import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../authentication/context/AuthContext.jsx";
import api from "../../../api/axios.js";
import "./HorseHealthForm.css"

function HorseHealthForm({horse}) {
    const {token, user} = useContext(AuthContext);
    const [healthId, setHealthId] = useState(null);
    const [formData, setFormData] = useState({
        weight: "",
        diet: "",
        allergies: "",
        medication: "",
        vaccinated: false,
        lastDeworming: "",
        notes: ""
    });

    const [message, setMessage] = useState("");

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

                if(response.data.length > 0){
                    const health = response.data[0];

                    setHealthId(health.id);

                    setFormData({
                        weight: health.weight || "",
                        diet: health.diet || "",
                        allergies: health.allergies || "",
                        medication: health.medication || "",
                        vaccinated: health.vaccinated || false,
                        lastDeworming: health.lastDeworming || "",
                        notes: health.notes || ""
                    });
                }

            } catch(error){
                console.error(error);
            }
        }
        getHealth();
    }, [horse, token]);

    function handleChange(e){
        const {name,value,type,checked} = e.target;
        setFormData(previous => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            if(healthId){
                // bestaande gegevens aanpassen
                await api.put(`/horseHealths/${healthId}`,
                    formData,
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

            } else {

                // nieuwe gezondheidsgegevens maken
                await api.post(
                    "/horseHealths",
                    {
                        ...formData,
                        userId:user.id,
                        horseId:horse.id
                    },
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );
            }

            setMessage("Gezondheidsgegevens opgeslagen");

        } catch(error){
            console.error(error);
            setMessage("Opslaan mislukt");
        }
    }
    return (

        <form onSubmit={handleSubmit} className="horsehealth-form-layout">
            <h3>
                Gezondheid {horse.name}
            </h3>
<div className="form-row">
    <label>
        Gewicht (kg)
        <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
        />
    </label>
</div>

            <div className="form-row">
            <label>
                Dieet
                <textarea
                    name="diet"
                    value={formData.diet}
                    onChange={handleChange}
                />
            </label>
            </div>

            <div className="form-row">
            <label>
                Allergieën
                <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                />
            </label>
            </div>
            <div className="form-row">
            <label>
                Medicatie
                <textarea
                    name="medication"
                    value={formData.medication}
                    onChange={handleChange}
                />
            </label>
            </div>
            <div className="form-row">

            <label>
                <input
                    type="checkbox"
                    name="vaccinated"
                    checked={formData.vaccinated}
                    onChange={handleChange}
                />

                Gevaccineerd
            </label></div>
            <div className="form-row">

            <label>
                Laatste ontworming
                <input
                    type="date"
                    name="lastDeworming"
                    value={formData.lastDeworming}
                    onChange={handleChange}
                />
            </label>
            </div>
            <div className="form-row">
            <label>
                Bijzonderheden
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </label>
            </div>

            <button type="submit">
                Opslaan
            </button>

            {message && (
                <p>
                    {message}
                </p>
            )}
        </form>

    );

}


export default HorseHealthForm;