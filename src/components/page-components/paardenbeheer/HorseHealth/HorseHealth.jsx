// React
import {useContext, useEffect, useState} from "react";

// Components
import HorseHealthForm from "../../../forms/HorseHealthForm/HorseHealthForm.jsx";

// Context / Hooks
import {AuthContext} from "../../../../context/AuthContext.jsx";

// Services
import {getHorseHealth} from "../../../../services/horseHealthService.js";

// CSS
import './HorseHealth.css';

function HorseHealth({horse}) {

    const {token} = useContext(AuthContext);
    const [health, setHealth] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!horse?.id || !token) return;

        async function fetchHealth() {
            try {
                setIsLoading(true);
                setError("");

                const data = await getHorseHealth(horse.id, token);
                setHealth(data[0] || null);
            } catch (error) {
                console.error("Gezondheidsgegevens ophalen mislukt:", error);
                setError("Het ophalen van de gezondheidsgegevens is mislukt.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchHealth();
    }, [horse?.id, token]);

    async function reloadHealth() {
        try {
            setIsLoading(true);
            setError("");

            const data = await getHorseHealth(horse.id, token);
            setHealth(data[0] || null);
            setShowForm(false);
        } catch (error) {
            console.error("Gezondheidsgegevens opnieuw ophalen mislukt:", error);
            setError("De gegevens zijn opgeslagen, maar konden niet opnieuw worden opgehaald.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="horse-health">
            <h2>Gezondheid</h2>
            {isLoading && <p>Gezondheidsgegevens worden geladen...</p>}
            {error && <p className="error-message">{error}</p>}

            {!isLoading && !health && !showForm && (
                <button
                    onClick={() => setShowForm(true)}
                >
                    Vul gezondheidsgegevens in
                </button>
            )}

            {showForm && !isLoading && (
                <HorseHealthForm
                    horse={horse}
                    onSaved={reloadHealth}
                />
            )}

            {!isLoading && health && !showForm && (
                <div className="health-overview">

                    <p>
                        Gewicht: {health.weight ? `${health.weight} kg` : "Geen gewicht ingevuld"}
                    </p>

                    <p>
                        Dieet: {health.diet ? `${health.diet}` : "Geen speciaal dieet"}
                    </p>

                    <p>
                        Allergieën: {health.allergies ? `${health.allergies}` : "Geen allergieën"}
                    </p>

                    <p>
                        Medicatie: {health.medication ? `${health.medication}` : "Geen medicatie"}
                    </p>

                    <p>
                        Vaccinatie: {health.vaccinated ? " Ja" : " Nee"}
                    </p>

                    <p>
                        Laatste ontworming: {health.lastDeworming ? `${health.lastDeworming}` :  "Niet ingevuld"}
                    </p>

                    <p>
                        Bijzonderheden: {health.notes ? `${health.notes}` : "Geen bijzonderheden"}
                    </p>

                    <button
                        onClick={() => setShowForm(true)}
                    >
                        Wijzigen
                    </button>
                </div>
            )}
        </section>
    );
}

export default HorseHealth;