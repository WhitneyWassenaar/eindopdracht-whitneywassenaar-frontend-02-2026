// Components
import StableRow from "../StableRow/StableRow.jsx";

// CSS
import './StableTable.css'

function StableTable({horses, moveHorse, boxes=[], contacts=[]}) {
    return (
        <table className="table-layout">
            <thead>
            <tr>
                <th>Box nummer</th>
                <th>Foto</th>
                <th>Naam</th>
                <th>Eigenaar</th>
                <th>Periode</th>
                <th>Status</th>
                <th>Acties</th>
            </tr>
            </thead>
            <tbody>
            {boxes.map((box) => (
                <StableRow
                    key={box.id}
                    box={box}
                    horses={horses}
                    moveHorse={moveHorse}
                    contacts={contacts}
                />
            ))}
            </tbody>
        </table>
    );
}

export default StableTable;