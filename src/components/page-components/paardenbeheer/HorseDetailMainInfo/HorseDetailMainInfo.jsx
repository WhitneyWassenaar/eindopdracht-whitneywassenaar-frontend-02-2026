import calculateAge from '../../../../helpers/calculateAge.jsx';
import HorseRelations from "../HorseRelations/HorseRelations.jsx";

import './HorseDetailMainInfo.css';

function HorseDetailMainInfo({horse,contacts}) {
    const defaultHorsePhoto = "/defaultHorsePhoto.png";
    console.log(horse.photo);
    console.log(
        "Relaties:",
        {
            horse: horse.name,
            caretakerId: horse.caretakerId,
            trainerId: horse.trainerId
        }
    );
    const owner = contacts.find(
        contact => Number(contact.id )=== Number(horse.ownerId)
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
                        <li>Ras: {horse.breed}</li>
                        <li>Geslacht: {horse.gender}</li>
                        <li>Leeftijd: {calculateAge(horse.birthDate)}</li>
                        <li>Geboren: {horse.birthDate}</li>
                        <li>Vachtkleur: {horse.color}</li>
                    </ul>
                </div>

                <div className="info-block">
                    <ul>
                        <li>
                            Eigenaar:{owner
                                ? `${owner.firstName} ${owner.lastName}`
                                : "Eigenaar onbekend"}
                        </li>
                        <li>Telefoon:{owner
                                ? `${owner.phone}`
                                : "Telefoonnummer onbekend"}
                        </li>
                        <li>Email:{owner
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

