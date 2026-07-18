// React


// Assets


// CSS
import './StableRow.css'

function StableRow({box, horses,contacts}) {
    const defaultHorsePhoto = "/defaultHorsePhoto.png";

    const horse = horses.find(
        horse => horse.boxId === box.id);

    const owner = contacts.find(
        contact => Number(contact.id) === Number(horse.ownerId));

    return (
        <tr className="stablerow-layout">
            <td>{box.boxNumber}</td>
            <td>
                {horse ? (
                    <img
                        src={horse.photo || defaultHorsePhoto}
                        alt={horse.name}
                        className="horse-photo"
                        onError={(e) => {
                            e.target.src = defaultHorsePhoto;
                        }}
                    />
                    ) : ("-")
                }

            </td>

            <td>{horse ? horse.name : "Vrij"}</td>
            <td>{owner ? `${owner.firstName} ${owner.lastName}` : "Eigenaar onbekend"}</td>
            <td>Datum</td>
            <td>
                {!horse && "Vrij"}
                {horse && horse.location === "Stal" && "Stal"}
                {horse && horse.location === "Wei" && "Wei"}
            </td>
            <td>Acties</td>
        </tr>
    );
}

export default StableRow;