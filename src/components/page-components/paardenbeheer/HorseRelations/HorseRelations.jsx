import Button from "../../../ui/Button/Button.jsx";

function HorseRelations({horse, contacts}) {

    const [showRelationForm, setShowRelationForm] = useState(false);

    const caretaker = contacts.find(
        contact => Number(contact.id) === Number(horse.caretakerId)
    );

    const trainer = contacts.find(
        contact => Number(contact.id) === Number(horse.trainerId)
    );

    return (
        <div className="info-block">
            <h4>Relaties</h4>

            {caretaker || trainer ? (
                <ul>
                    {caretaker && (
                        <li>
                            Verzorger: {caretaker.firstName} {caretaker.lastName}
                        </li>
                    )}

                    {trainer && (
                        <li>
                            Trainer: {trainer.firstName} {trainer.lastName}
                        </li>
                    )}
                </ul>
            ) : (
                <p>Geen relaties</p>
            )}

            <Button
                onClick={() => setShowRelationForm(!showRelationForm)}
            >
                Relaties beheren
            </Button>
        </div>
    );
}

export default HorseRelations;