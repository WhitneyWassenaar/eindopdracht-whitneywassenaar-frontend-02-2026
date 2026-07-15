import { useState } from "react";
import Button from "../../ui/Button/Button.jsx";
import './HorseRelationForm.css';
import projectId from "../../../data/projectId.js";
import {AuthContext} from "../../authentication/context/AuthContext.jsx";
import {useContext} from "react";

function HorseRelationsForm({ contacts,horse, setHorses, setSelectedHorse}) {
    const [caretakerId, setCaretakerId] = useState(
        horse.caretakerId || ""
    );

    const [trainerId, setTrainerId] = useState(
        horse.trainerId || ""
    );

    const caretakers = contacts.filter(
        contact => contact.role === "Verzorger"
    );

    const trainers = contacts.filter(
        contact => contact.role === "Trainer"
    );

    const {token} = useContext(AuthContext);

    async function saveRelations() {

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
                        caretakerId: caretakerId || null,
                        trainerId: trainerId || null
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

        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="form-layout">
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