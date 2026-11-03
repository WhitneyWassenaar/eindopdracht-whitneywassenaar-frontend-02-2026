// CSS
import "./HorseRelations.css";

function HorseRelations({horse, contacts = []}) {

    const caretaker = contacts.find(
        contact => Number(contact.id) === Number(horse.caretakerId)
    );

    const trainer = contacts.find(
        contact => Number(contact.id) === Number(horse.trainerId)
    );

    return (
        <div className="relation-info-block">
            <h4>Relaties</h4>

            {caretaker || trainer ? (
                <ul>
                    {caretaker && (
                        <li>
                            <span className="relation-info-label">Verzorger</span> {caretaker.firstName} {caretaker.lastName}
                        </li>
                    )}

                    {trainer && (
                        <li>
                            <span className="relation-info-label">Trainer</span> {trainer.firstName} {trainer.lastName}
                        </li>
                    )}
                </ul>
            ) : (
                <p>Geen relaties</p>
            )}
        </div>
    );
}

export default HorseRelations;