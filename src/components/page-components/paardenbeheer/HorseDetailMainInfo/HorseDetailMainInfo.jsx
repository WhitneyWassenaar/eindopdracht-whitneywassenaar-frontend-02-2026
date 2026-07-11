import "./HorseDetailMainInfo.css"
import persons from "../../../../data/json/persons.json";
function HorseDetailMainInfo({horse}) {

    const owner = persons.find(
        persons => persons.id === horse.ownerId
    );

    const contactPerson= persons.find(
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
                        <li>Leeftijd: {horse.birthDate}</li>
                        <li>Geboren: {horse.birthDate}</li>
                        <li>Vachtkleur: {horse.color}</li>
                    </ul>
                </div>
                <div className="info-block">
                    <h3>Eigenaar: {`${owner.firstName} ${owner.lastName}`}</h3>
                    <ul>
                        <li>Telefoon: {`${contactPerson.phone}`}</li>
                        <li>Email: {`${contactPerson.email}`}</li>
                    </ul>
                </div>

                <div className="info-block">
                    <h4>Relaties</h4>
                    <ul>
                        <li>{caretaker && (`Verzorger: ${caretaker.firstName} ${caretaker.lastName}`)} </li>
                        <li> {trainer && (`Trainer:${trainer.firstName} ${trainer.lastName}`)} </li>
                    </ul>
                </div>



            </div>
        </div>
    );
}

export default HorseDetailMainInfo;