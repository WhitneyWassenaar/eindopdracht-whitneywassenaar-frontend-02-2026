// React
import {useContext, useEffect, useState} from "react";

// Context / Hooks
import {AuthContext} from "../../../context/AuthContext.jsx";

// Services
import {getHorseHealth, updateHorseHealth, createHorseHealth} from "../../../services/horseHealthService.js";

// CSS
import "./HorseHealthForm.css";

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

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!horse || !token) return;

        const controller = new AbortController();

        async function getHealth() {
            try {
                setIsLoading(true);
                setMessage("");

                const healthData = await getHorseHealth(
                    horse.id,
                    token,
                    controller.signal
                );

                if (controller.signal.aborted) return;

                if (healthData.length > 0) {
                    const health = healthData[0];

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
                } else {
                    setHealthId(null);
                }

            } catch (error) {
                if (
                    error.name === "CanceledError" ||
                    error.name === "AbortError"
                ) {
                    return;
                }

                console.error("Gezondheidsgegevens ophalen mislukt:", error);
                setMessage("Gezondheidsgegevens ophalen is mislukt.");
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        getHealth();

        return () => {
            controller.abort();
        };
    }, [horse?.id, token]);

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
            setIsSaving(true);
            setMessage("");
            const healthData = {
                ...formData,
                weight: formData.weight === "" ? null : Number(formData.weight),
                lastDeworming: formData.lastDeworming || null
            };

            if (healthId) {
                await updateHorseHealth(healthId, healthData, token);
            } else {
                await createHorseHealth(

                    {
                        ...healthData,
                        weight: formData.weight === "" ? undefined : Number(formData.weight),
                        lastDeworming: formData.lastDeworming || undefined,
                        userId: user.id,
                        horseId: horse.id
                    },
                    token
                );
            }

            setMessage("Gezondheidsgegevens opgeslagen");

            if (onSaved) {
                onSaved();
            }

        } catch (error) {
            console.error(error);
            setMessage("Opslaan mislukt");
        } finally {
            setIsSaving(false);
        }
    }

    return (

        <form onSubmit={handleSubmit} className="horsehealth-form-layout">
            {isLoading && (
                <p>Gezondheidsgegevens worden geladen...</p>
            )}

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
                        max={new Date().toLocaleDateString("en-CA")}
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

            <button type="submit" disabled={isSaving || isLoading}>
                {isSaving ? "Bezig met opslaan..." : "Opslaan"}
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