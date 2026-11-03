// Components
import HorseRelations from "../HorseRelations/HorseRelations.jsx";

// Helpers
import calculateAge from '../../../../helpers/calculateAge.jsx';

// CSS
import './HorseDetailMainInfo.css';

const defaultHorsePhoto = "/defaultHorsePhoto.png";

function HorseDetailMainInfo({horse, contacts}) {
    const owner = contacts.find(
        contact => Number(contact.id) === Number(horse.ownerId)
    );

    return (
        <div className="horse-detail-main-info-container">
            <div className="horse-profile-picture">
                <img src={horse.photo || defaultHorsePhoto} alt={horse.name}/>
            </div>

            <div className="horse-main-info">
                <div className="info-block">
                    <h2>{horse.name}</h2>
                    <ul>
                        <li>
                            <span className="info-label">Ras</span> {horse.breed}
                        </li>
                        <li>
                            <span className="info-label">Geslacht</span> {horse.gender}
                        </li>
                        <li>
                            <span className="info-label">Leeftijd</span> {calculateAge(horse.birthDate)}
                        </li>
                        <li>
                            <span className="info-label">Geboren</span> {horse.birthDate}
                        </li>
                        <li>
                            <span className="info-label">Vachtkleur</span> {horse.color}
                        </li>
                    </ul>
                </div>

                <div className="info-block">
                    <ul>
                        <li>
                            <span className="info-label">Eigenaar</span> {owner
                            ? `${owner.firstName} ${owner.lastName}`
                            : "Eigenaar onbekend"}
                        </li>
                        <li>
                            <span className="info-label">Telefoon</span> {owner
                            ? `${owner.phone}`
                            : "Telefoonnummer onbekend"}
                        </li>
                        <li>
                            <span className="info-label">Email</span> {owner
                            ? `${owner.email}`
                            : "Email onbekend"}
                        </li>
                    </ul>
                </div>

                <HorseRelations
                    horse={horse}
                    contacts={contacts}/>
            </div>
        </div>
    );
}

export default HorseDetailMainInfo;