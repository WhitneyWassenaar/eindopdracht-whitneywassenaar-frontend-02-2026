// React
import {useContext, useEffect, useState} from "react";

// Context / Hooks
import {AuthContext} from "../../authentication/context/AuthContext.jsx";

// Api
import api from "../../../api/axios.js";

// CSS
import "./HorseHealthForm.css"

function HorseHealthForm({horse, onSaved}) {
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

        if (!horse || !token) return;

        async function getHealth() {
            try {

                const response = await api.get(`/horses/${horse.id}/horseHealths`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data.length > 0) {
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

            } catch (error) {
                console.error(error);
            }
        }

        getHealth();
    }, [horse, token]);

    function handleChange(e) {
        const {name, value, type, checked} = e.target;
        setFormData(previous => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (healthId) {
                // bestaande gegevens aanpassen
                await api.patch(`/horseHealths/${healthId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

            } else {

                // nieuwe gezondheidsgegevens maken
                await api.post(
                    "/horseHealths",
                    {
                        ...formData,
                        userId: user.id,
                        horseId: horse.id
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            setMessage("Gezondheidsgegevens opgeslagen");
            if (onSaved) {
                onSaved();
            }

        } catch (error) {
            console.error(error);
            setMessage("Opslaan mislukt");
        }
    }

    return (

        <form onSubmit={handleSubmit} className="horsehealth-form-layout">

            <div className="form-row">
                <label htmlFor="weight">
                    Gewicht (kg)
                </label>
                    <input
                        id="weight"
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        min="0"
                        max="1500"
                        step="1"
                    />

            </div>

            <div className="form-row">
                <label htmlFor="diet">
                    Dieet
                </label>
                    <textarea
                        id="diet"
                        name="diet"
                        value={formData.diet}
                        onChange={handleChange}
                    />
            </div>

            <div className="form-row">
                <label htmlFor="allergies">
                    Allergieën
                </label>
                    <textarea
                        id="allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                    />
            </div>

            <div className="form-row">
                <label htmlFor="medication">
                    Medicatie
                </label>
                    <textarea
                        id="medication"
                        name="medication"
                        value={formData.medication}
                        onChange={handleChange}
                    />
            </div>

            <div className="form-row">
                <label htmlFor="vaccinated">
                    Gevaccineerd
                </label>
                    <input
                        id="vaccinated"
                        type="checkbox"
                        name="vaccinated"
                        checked={formData.vaccinated}
                        onChange={handleChange}
                    />
            </div>

            <div className="form-row">
                <label htmlFor="last-deworming">
                    Laatste ontworming
                </label>
                    <input
                        id="last-deworming"
                        type="date"
                        name="lastDeworming"
                        value={formData.lastDeworming}
                        onChange={handleChange}
                    />
            </div>

            <div className="form-row">
                <label htmlFor="notes">
                    Bijzonderheden
                </label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />
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