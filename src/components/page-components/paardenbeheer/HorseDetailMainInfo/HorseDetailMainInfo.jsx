import calculateAge from '../../../../helpers/calculateAge.jsx';

import './HorseDetailMainInfo.css';

function HorseDetailMainInfo({horse,contacts}) {
    const defaultHorsePhoto = "/defaultHorsePhoto.png";
    console.log(horse.photo);

    const owner = contacts.find(
        contact => Number(contact.id )=== Number(horse.ownerId)
    );

    const contactPerson = contacts.find(
        contact=> Number(contact.id) === Number(horse.contactPersonId)
    );

    const caretaker = contacts.find(
        contact => Number(contact.id) === Number(horse.caretakerId)
    );

    const trainer = contacts.find(
        contact=> Number(contact.id) === Number(horse.trainerId)
    );

    console.log("Paard:", horse);
    console.log("Contacten:", contacts);
    console.log("ownerId van paard:", horse.ownerId);

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
                    <h3>Eigenaar: {owner ? `${owner.firstName} ${owner.lastName}`: "Eigenaar onbekend"}</h3>
                    <ul>
                        <li>Telefoon: {contactPerson ? `${contactPerson.phone}` : "Telefoonnummer onbekend"}</li>
                        <li>Email: {contactPerson ? `${contactPerson.email}`: "Email onbekend"}</li>
                    </ul>
                </div>

                <div className="info-block">
                    <h4>Relaties</h4>
                    <ul>
                        <li>{caretaker ? `Verzorger: ${caretaker.firstName} ${caretaker.lastName}` : "Verzorger onbekend"} </li>
                        <li> {trainer ? `Trainer:${trainer.firstName} ${trainer.lastName}`: "Trainer onbekend"} </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HorseDetailMainInfo;

