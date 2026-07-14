import { useState } from "react";
import Button from "../../ui/Button/Button.jsx";
import './HorseRelationForm.css';

function HorseRelationsForm({ contacts }) {

    const [caretakerId, setCaretakerId] = useState("");
    const [trainerId, setTrainerId] = useState("");

    const caretakers = contacts.filter(
        contact => contact.role === "Verzorger"
    );

    const trainers = contacts.filter(
        contact => contact.role === "Trainer"
    );

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
            >
                Opslaan
            </Button>
        </div>
    );
}

export default HorseRelationsForm;