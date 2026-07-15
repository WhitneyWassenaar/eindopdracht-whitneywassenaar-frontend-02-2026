// React
import {useState, useContext} from "react";

// Components
import Button from "../../ui/Button/Button.jsx";

// Context / Hooks
import {AuthContext} from "../../authentication/context/AuthContext.jsx";

// Data
import projectId from "../../../data/projectId.js";

// CSS
import './HorseRelationForm.css';

function HorseRelationsForm({contacts, horse, setHorses, setSelectedHorse}) {

    const {token} = useContext(AuthContext);

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

        const validTrainerId = trainerId || null;
        const validCaretakerId = caretakerId || null;
        const validOwnerId = ownerId || null;

        try {
            const response = await fetch(
                `https://novi-backend-api-wgsgz.ondigitalocean.app/api/horses/${horse.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "novi-education-project-id": projectId,
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ownerId: validOwnerId,
                        caretakerId: validCaretakerId,
                        trainerId: validTrainerId
                    }),
                }
            );

            if (!response.ok) {
                console.error("Relaties opslaan mislukt");
                return;
            }

            const updatedHorse = await response.json();

            setHorses(previousHorses =>
                previousHorses.map(previousHorse =>
                    previousHorse.id === updatedHorse.id
                        ? updatedHorse
                        : previousHorse
                )
            );

            setSelectedHorse(updatedHorse);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="form-layout">
            <div className="label-wrapper">
                <label className="relation-label">
                    Eigenaar
                </label>

                <select
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
                <label className="relation-label">
                    Verzorger
                </label>

                <select
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
                <label className="relation-label">
                    Trainer
                </label>

                <select
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

            <Button
                variant="save-relations"
                onClick={saveRelations}
            >
                Opslaan
            </Button>
        </div>
    );
}

export default HorseRelationsForm;