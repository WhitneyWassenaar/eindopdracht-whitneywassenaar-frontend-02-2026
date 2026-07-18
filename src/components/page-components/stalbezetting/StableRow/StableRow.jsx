// CSS
import './StableRow.css'

function StableRow({box, horses,contacts}) {
    const defaultHorsePhoto = "/defaultHorsePhoto.png";

    const horse = horses?.find(
        horse => horse.boxId === box.id);

    const owner = contacts?.find(
        contact => Number(contact.id) === Number(horse?.ownerId));

    const status = !horse
        ? "Vrij"
        : horse.location === "stal"
            ? "Stal"
            : "Wei";

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

            <td>{horse ? horse.name : "-"}</td>
            <td>
                {horse
                ? owner
                    ? `${owner.firstName} ${owner.lastName}`
                    : "Eigenaar onbekend"
                : "-"
            }
            </td>
            <td>Datum</td>
            <td>{status}</td>
            <td>Acties</td>
        </tr>
    );
}

export default StableRow;

// class maken voor visueel onderscheid van status