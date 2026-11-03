// React
import Button from '../../../ui/Button/Button.jsx';

// Assets
import deleteIcon from '/src/assets/delete-icon.png';

// CSS
import './CareTaskRow.css';


function CareTaskRow({
                         careTask,
                         deleteCareTask,
                         openAssignForm})
{

    function handleAssign(e) {
        e.stopPropagation();
        openAssignForm(careTask);
    }

    function handleDelete(e) {
        e.stopPropagation();
        deleteCareTask(careTask.id);
    }


    return (
        <tr className="caretask-row-layout">
            <td>{careTask.title}</td>
            <td>{careTask.description}</td>

            <td>
                <Button
                    variant="assign"
                    onClick={handleAssign}>
                   Toewijzen
                </Button>

                <Button
                    variant="delete"
                    onClick={handleDelete}>
                    <img src={deleteIcon} alt="Verwijderen"/>
                </Button>
            </td>
        </tr>
    );
}

export default CareTaskRow;