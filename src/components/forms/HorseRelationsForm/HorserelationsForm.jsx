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
        const relations = {
            ownerId: ownerId || null,
            caretakerId: caretakerId || null,
            trainerId: trainerId || null
        };

        try {
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

            setSelectedHorse(updatedHorse);

        } catch (error) {
            console.error("Relaties opslaan mislukt:", error);
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