// Components
import CareTaskRow from "../CareTaskRow/CareTaskRow.jsx";

// CSS
import "./CareTasksTable.css";

function CareTasksTable({careTasks, deleteCareTask, openAssignForm}) {
    return (
        <table className="table-layout">
            <thead>
            <tr>
                <th>Titel</th>
                <th>Beschrijving</th>
                <th>Acties</th>
            </tr>
            </thead>
            <tbody>
            {careTasks.map((careTask) => (
                <CareTaskRow
                    key={careTask.id}
                    careTask={careTask}
                    deleteCareTask={deleteCareTask}
                    openAssignForm={openAssignForm}
                />
            ))}
            </tbody>
        </table>
    );
}

export default CareTasksTable;