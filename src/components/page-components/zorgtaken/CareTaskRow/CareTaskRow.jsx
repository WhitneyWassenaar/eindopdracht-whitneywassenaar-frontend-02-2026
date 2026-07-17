// React
import Button from '../../../ui/Button/Button.jsx';

// Assets
import deleteIcon from '/src/assets/delete-icon.png'

// CSS
import './CareTaskRow.css'

function CareTaskRow({careTask, deleteCareTask, openAssignForm}) {

    return (
        <tr className="caretask-row-layout">
            <td>{careTask.title}</td>
            <td>{careTask.description}</td>

            <td>
                <Button
                    variant={"assign"}
                    onClick={(e) => {
                        e.stopPropagation();
                      openAssignForm(careTask)
                    }}>
                   Toewijzen
                </Button>

                <Button
                    variant={"delete"}
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteCareTask(careTask.id);
                    }}>
                    <img src={deleteIcon} alt={"delete icon"}/>
                </Button>
            </td>
        </tr>
    );
}

export default CareTaskRow;