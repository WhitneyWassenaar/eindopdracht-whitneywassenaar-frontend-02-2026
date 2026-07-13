import calculateAge from '../../../../helpers/calculateAge.jsx';

import persons from '../../../../data/json/persons.json';

import './HorseDetailMainInfo.css';

function HorseDetailMainInfo({horse}) {

    const owner = persons.find(
        persons => persons.id === horse.ownerId
    );

    const contactPerson = persons.find(
        persons => persons.id === horse.contactPersonId
    );

    const caretaker = persons.find(
        persons => persons.id === horse.caretakerId
    );

    const trainer = persons.find(
        persons => persons.id === horse.trainerId
    );

    return (
        <div className="horse-detail-main-info-container">
            <div className="horse-profile-picture">
                <img src={"/"} alt={horse.name}/>
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