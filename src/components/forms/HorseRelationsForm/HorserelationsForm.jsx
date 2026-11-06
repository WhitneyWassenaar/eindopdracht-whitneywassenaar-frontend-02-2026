// React
import {useState, useContext} from "react";

// Components
import Button from "../../ui/Button/Button.jsx";

// Context / Hooks
import {AuthContext} from "../../../context/AuthContext.jsx";

// Services
import {updateHorseRelations} from "../../../services/horseService.js";

// CSS
import './HorseRelationForm.css';

function HorseRelationsForm({contacts, horse, setHorses}) {

    const {token} = useContext(AuthContext);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    const [ownerId, setOwnerId] = useState(
        horse.ownerId || ""
    );

    const [caretakerId, setCaretakerId] = useState(
        horse.caretakerId || ""
    );

    const [trainerId, setTrainerId] = useState(
        horse.trainerId || ""
    );

    const owners = contacts.filter(
        contact =>
            contact.role === "Eigenaar" &&
            contact.active
    );

    const caretakers = contacts.filter(
        contact =>
            contact.role === "Verzorger" &&
            contact.active
    );

    const trainers = contacts.filter(
        contact =>
            contact.role === "Trainer" &&
            contact.active
    );

    async function saveRelations() {
        const relations = {
            ownerId: ownerId || null,
            caretakerId: caretakerId || null,
            trainerId: trainerId || null
        };

        try {
            setIsSaving(true);
            setError("");
            const updatedHorse = await updateHorseRelations(
                horse.id,
                relations,
                token
            );

            setHorses(previousHorses =>
                previousHorses.map(previousHorse =>
                    previousHorse.id === updatedHorse.id
                        ? updatedHorse
                        : previousHorse
                )
            );

        } catch (error) {
            console.error("Relaties opslaan mislukt:", error);
            setError("Het opslaan van de relaties is mislukt.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="form-layout">
            <div className="label-wrapper">
                <label
                    htmlFor="owner"
                    className="relation-label"
                >
                    Eigenaar
                </label>

                <select
                    id="owner"
                    value={ownerId}
                    onChange={(e) => setOwnerId(e.target.value)}
                >
                    <option value="">
                        Geen eigenaar
                    </option>

                    {owners.map((contact) => (
                        <option
                            key={contact.id}
                            value={contact.id}
                        >
                            {contact.firstName} {contact.lastName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="label-wrapper">
                <label
                    htmlFor="caretaker"
                    className="relation-label"
                >
                    Verzorger
                </label>
                <select
                    id="caretaker"
                    value={caretakerId}
                    onChange={(e) => setCaretakerId(e.target.value)}
                >
                    <option value="">
                        Geen verzorger
                    </option>

                    {caretakers.map((contact) => (
                        <option
                            key={contact.id}
                            value={contact.id}
                        >
                            {contact.firstName} {contact.lastName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="label-wrapper">
                <label
                    htmlFor="trainer"
                    className="relation-label"
                >
                    Trainer
                </label>
                <select
                    id="trainer"
                    value={trainerId}
                    onChange={(e) => setTrainerId(e.target.value)}
                >
                    <option value="">
                        Geen trainer
                    </option>

                    {trainers.map((contact) => (
                        <option
                            key={contact.id}
                            value={contact.id}
                        >
                            {contact.firstName} {contact.lastName}
                        </option>
                    ))}
                </select>
            </div>
            {error && (
                <p className="error-message">{error}</p>
            )}
            <Button
                variant="save-relations"
                onClick={saveRelations}
                disabled={isSaving}
            >
                {isSaving ? "Bezig met opslaan..." : "Opslaan"}
            </Button>
        </div>
    );
}

export default HorseRelationsForm;