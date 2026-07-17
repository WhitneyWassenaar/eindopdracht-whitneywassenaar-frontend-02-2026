// Components
import CareTaskRow from "../CareTaskRow/CareTaskRow.jsx";

// CSS
import "./CareTasksTable.css";

function CareTasksTable({careTasks, deleteCareTask}) {
    return (
        <table className="table-layout">
            <thead>
            <tr>
                <th>Titel</th>
                <th>Beschrijving</th>
                <th>Einddatum</th>
                <th>Status</th>
                <th>Acties</th>
            </tr>
            </thead>
            <tbody>
            {careTasks.map((careTask) => (
                <CareTaskRow
                    key={careTask.id}
                    careTask={careTask}
                    deleteCareTask={deleteCareTask}
                />
            ))}
            </tbody>
        </table>
    );
}

export default CareTasksTable;