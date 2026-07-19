// CSS
import './StableRow.css'

function StableRow({box, horses, contacts, fromBoxToPasture, fromPastureToBox, placeHorseInBox, removeHorseFromBox, setMovingHorse, movingHorse, moveHorseToBox,boxes, updateHorseDates}) {
    const defaultHorsePhoto = "/defaultHorsePhoto.png";

    const horse = horses?.find(
        horse => Number(horse.boxId) === Number(box.id)
    );

    const owner = contacts?.find(
        contact => Number(contact.id) === Number(horse?.ownerId));
    console.log("Gevonden paard voor deze box:", horse);
    console.log(
        "BOX:",
        box.id,
        "paarden in deze box:",
        horses.filter(horse => Number(horse.boxId) === Number(box.id))
    );

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
                {horse ? (
                    <>
                        {horse.active && (
                            <>
                                {movingHorse?.id === horse.id ? (
                                    <>
                                    <select
                                        onChange={(e) =>
                                            moveHorseToBox(horse, e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Kies nieuwe box
                                        </option>

                                        {boxes
                                            .filter(box =>
                                                !horses.some(h =>
                                                    Number(h.boxId) === Number(box.id)
                                                )
                                            )
                                            .map(box => (
                                                <option
                                                    key={box.id}
                                                    value={box.id}
                                                >
                                                    Box {box.boxNumber}
                                                </option>
                                            ))
                                        }
                                    </select>

                                    <button
                                        onClick={() => setMovingHorse(null)}
                                    >
                                        Verplaatsen annuleren
                                    </button>
                                    </>
                                    ) : (
                                    <button
                                    onClick={() => setMovingHorse(horse)}
                                >
                            Verplaatsen
                            </button>
                        )}




                                {horse.location === "stal" ? (
                                    <button
                                        onClick={() => fromBoxToPasture(horse)}
                                    >
                                        Naar wei
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => fromPastureToBox(horse)}
                                    >
                                        Zet op stal
                                    </button>
                                )}
                            </>
                        )}

                        <button
                            onClick={() => removeHorseFromBox(horse)}
                        >
                            Loskoppelen
                        </button>
                    </>
                ) : (
                    <select
                        onChange={(e) =>
                            placeHorseInBox(e.target.value, box.id)
                        }
                    >
                        <option value="">
                            Paard plaatsen
                        </option>

                        {horses
                            ?.filter(horse =>
                                !horse.boxId && horse.active
                            )
                            .map(horse => (
                                <option
                                    key={horse.id}
                                    value={horse.id}
                                >
                                    {horse.name}
                                </option>
                            ))
                        }
                    </select>
                )}
            </td>
        </tr>
    );
}

export default StableRow;

// class maken voor visueel onderscheid van status