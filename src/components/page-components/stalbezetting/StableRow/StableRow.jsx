// CSS
import './StableRow.css'

function StableRow({box, horses,contacts, updateHorse}) {
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
            <td>
                {horse ? (
                <>
                    <button>
                        Verplaatsen
                    </button>

                    <button
                        onClick={() => updateHorse(horse)}
                    >
                        Naar wei
                    </button>
                </>
            ) : (
                <button>
                    Paard plaatsen
                </button>
            )}
            </td>
        </tr>
    );
}

export default StableRow;

// class maken voor visueel onderscheid van status