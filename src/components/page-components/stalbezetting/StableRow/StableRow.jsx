// CSS
import './StableRow.css'
import api from "../../../../api/axios.js";
import {useContext} from "react";
import {AuthContext} from "../../../authentication/context/AuthContext.jsx";

function StableRow({box, horses,contacts, fromBoxToPasture, fromPastureToBox}) {
    const {token} = useContext(AuthContext);
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

    async function placeHorseInBox(horseId, boxId) {
        try {
            await api.patch(`/horses/${horseId}`, {
                boxId: Number(boxId),
                location: "stal"
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            window.location.reload();

        } catch (error) {
            console.error("Paard plaatsen mislukt:", error);
        }
    }

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
            ) : (
                    <select
                        onChange={(e) => placeHorseInBox(e.target.value, box.id)}
                    >
                        <option value="">
                            Paard plaatsen
                        </option>

                        {horses?.filter(horse => horse.location === "wei")
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