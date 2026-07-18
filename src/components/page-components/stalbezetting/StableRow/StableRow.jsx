function StableRow({box, horses, contacts, moveHorse}) {

    const horse = horses.find(
        horse => horse.boxNumber === box.number
    );

    const owner = contacts.find(
        contact => contact.id === horse?.ownerId
    );

    return (
        <tr className="stablerow-layout">
            <td>
                {box.number}
            </td>

            <td>
                {horse?.photo ? (
                    <img
                        src={horse.photo}
                        alt={horse.name}
                    />
                ) : (
                    "-"
                )}
            </td>

            <td>
                {horse ? horse.name : "Vrij"}
            </td>

            <td>
                {owner
                    ? `${owner.firstName} ${owner.lastName}`
                    : "Onbekend"
                }
            </td>

            <td>
                -
            </td>

            <td>
                {horse ? "Bezet" : "Vrij"}
            </td>

            <td>
                {horse ? (
                    <button onClick={() => moveHorse(horse)}>
                        Wijzigen
                    </button>
                ) : (
                    <button>
                        Plaatsen
                    </button>
                )}
            </td>
        </tr>
    );
}

export default StableRow;