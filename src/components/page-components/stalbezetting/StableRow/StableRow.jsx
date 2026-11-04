// Components
import StableRowActions from '../StableRowActions/StableRowActions.jsx';

// CSS
import './StableRow.css'

const defaultHorsePhoto = "/defaultHorsePhoto.png";

function StableRow({
                       box,
                       horses = [],
                       contacts = [],
                       fromBoxToPasture,
                       fromPastureToBox,
                       placeHorseInBox,
                       removeHorseFromBox,
                       setMovingHorse,
                       movingHorse,
                       moveHorseToBox,
                       boxes = [],
                       updateHorseDates,
                       movingHorseId,
                       removingHorseId,
                       changingBoxHorseId})
{

    const horse = horses.find(
        currentHorse => Number(currentHorse.boxId) === Number(box.id)
    );

    const owner = contacts.find(
        contact => Number(contact.id) === Number(horse?.ownerId));

    const status = !horse
        ? "Vrij"
        : horse.location === "stal"
            ? "Stal"
            : "Wei";

    return (
        <tr className={horse && !horse.active
            ? "stablerow-layout inactive-row"
            : "stablerow-layout"}>
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

            <td>
                {horse ? (
                    <>
                        <input
                            type="date"
                            disabled={!horse.active}
                            value={horse.boxStartDate || ""}
                            onChange={(e) =>
                                updateHorseDates(
                                    horse,
                                    "boxStartDate",
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="date"
                            disabled={!horse.active}
                            min={new Date().toISOString().split("T")[0]}
                            value={horse.boxEndDate || ""}
                            onChange={(e) =>
                                updateHorseDates(
                                    horse,
                                    "boxEndDate",
                                    e.target.value
                                )
                            }
                        />
                    </>
                ) : (
                    "-"
                )}
            </td>

            <td>{status}</td>
            <td>
                <StableRowActions
                    horse={horse}
                    horses={horses}
                    boxes={boxes}
                    boxId={box.id}
                    movingHorse={movingHorse}
                    setMovingHorse={setMovingHorse}
                    moveHorseToBox={moveHorseToBox}
                    fromBoxToPasture={fromBoxToPasture}
                    fromPastureToBox={fromPastureToBox}
                    removeHorseFromBox={removeHorseFromBox}
                    placeHorseInBox={placeHorseInBox}
                    movingHorseId={movingHorseId}
                    removingHorseId={removingHorseId}
                    changingBoxHorseId={changingBoxHorseId}
                />
            </td>
        </tr>
    );
}

export default StableRow;

// class maken voor visueel onderscheid van status