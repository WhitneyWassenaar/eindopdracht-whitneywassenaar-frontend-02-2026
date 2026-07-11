import "./HorseDetailMainInfo.css"

function HorseDetailMainInfo() {
    return (
        <div className="horse-detail-main-info-container">
            <div className="horse-profile-picture">
                <img src={"/"} alt={"/"}/>
            </div>

            <div className="horse-main-info">
                <ul>
                    <li>Naam: </li>
                    <li>Ras: </li>
                    <li>Geslacht: </li>
                    <li>Leeftijd: </li>
                    <li>Geboren: </li>
                    <li>Vachtkleur: </li>
                    <li>Eigenaar:</li>
                    <li>Contact:</li>
                    <li>Verzorger: conditioneel </li>
                    <li>Trainer: conditioneel </li>
                </ul>
            </div>
        </div>
    );
}

export default HorseDetailMainInfo;