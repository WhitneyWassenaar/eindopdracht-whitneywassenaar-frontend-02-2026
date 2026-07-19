// React
import {useState, useContext} from "react";

// Components
import Button from "../../ui/Button/Button.jsx";

// Context / Hooks
import {AuthContext} from "../../authentication/context/AuthContext.jsx";


// CSS
import './HorseRelationForm.css';
import api from "../../../api/axios.js";

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

            const response = await api.patch(
                `/horses/${horse.id}`,
                {
                    ownerId: validOwnerId,
                    caretakerId: validCaretakerId,
                    trainerId: validTrainerId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const updatedHorse = response.data;

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