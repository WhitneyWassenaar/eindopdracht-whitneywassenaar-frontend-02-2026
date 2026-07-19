// Components
import StableRow from "../StableRow/StableRow.jsx";

// CSS
import './StableTable.css'

function StableTable({boxes, horses, contacts, updateHorse, fromBoxToPasture, fromPastureToBox, placeHorseInBox, removeHorseFromBox}) {
    return (
        <table className="table-layout">
            <thead>
            <tr>
                <th>Box</th>
                <th>Foto</th>
                <th>Naam</th>
                <th>Eigenaar</th>
                <th>Periode</th>
                <th>Status</th>
                <th>Acties</th>
            </tr>
            </thead>
            <tbody>
            {boxes?.map((box) => (
                <StableRow
                    key={box.id}
                    box={box}
                    horses={horses}
                    contacts={contacts}
                    updateHorse={updateHorse}
                    fromBoxToPasture={fromBoxToPasture}
                    fromPastureToBox={fromPastureToBox}
                    placeHorseInBox={placeHorseInBox}
                    removeHorseFromBox={removeHorseFromBox}
                />
            ))}
            </tbody>
        </table>
    );
}

export default StableTable;