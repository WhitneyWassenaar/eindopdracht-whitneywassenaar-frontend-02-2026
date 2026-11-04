// React
import {useContext, useEffect, useState} from "react";

// Components
import CareTasksTable from "../../../components/page-components/zorgtaken/CareTasksTable/CareTasksTable.jsx";
import CreateCareTaskForm from "../../../components/forms/CreateCareTaskForm/CreateCareTaskForm.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import AssignCareTaskForm from "../../../components/forms/AssignCareTaskForm/AssignCareTaskForm.jsx";

// Context / Hooks
import {AuthContext} from "../../../context/AuthContext.jsx";

// Services
import {
    getCareTasksByUser,
    deleteCareTask as deleteCareTaskFromApi
} from "../../../services/careTaskService.js";

// CSS
import './Zorgtaken.css'

function Zorgtaken() {
    const {token, user} = useContext(AuthContext);
    const [careTasks, setCareTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedCareTask, setSelectedCareTask] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [deletingCareTaskId, setDeletingCareTaskId] = useState(null);
    const [deleteError, setDeleteError] = useState("");

    function addCareTask(newCareTask) {
        setCareTasks(previousTasks => [
            ...previousTasks,
            newCareTask
        ]);
    }

    async function deleteCareTask(id) {
        if (!window.confirm("Weet je zeker dat je deze zorgtaak wilt verwijderen?")) {
            return;
        }

        try {
            setDeletingCareTaskId(id);
            setDeleteError("");

            await deleteCareTaskFromApi(id, token);

            setCareTasks((previousTasks) =>
                previousTasks.filter((task) => task.id !== id)
            );
        } catch (error) {
            console.error("Fout bij verwijderen zorgtaak:", error);
            setDeleteError("Het verwijderen van de zorgtaak is mislukt.");
        } finally {
            setDeletingCareTaskId(null);
        }
    }

    useEffect(() => {
        if (!token || !user) return;

        async function getCareTasks() {
            try {
                setIsLoading(true);
                setError("");

                const careTasksData = await getCareTasksByUser(user.id, token);
                setCareTasks(careTasksData);
            } catch (error) {
                console.error("Fout bij ophalen zorgtaken:", error);
                setError("Het ophalen van de zorgtaken is mislukt.");
            } finally {
                setIsLoading(false);
            }
        }

        getCareTasks();
    }, [token, user]);

    function openAssignForm(careTask) {
        setSelectedCareTask(careTask);
    }

    return (
        <div className="dashboard-page">
            <h1>Zorgtaken</h1>
            {isLoading && (
                <p>Zorgtaken worden geladen...</p>
            )}
            {deleteError && (
                <p className="error-message">{deleteError}</p>
            )}
            {error && (
                <p className="error-message">{error}</p>
            )}
            <CareTasksTable
                careTasks={careTasks}
                deleteCareTask={deleteCareTask}
                openAssignForm={openAssignForm}
                deletingCareTaskId={deletingCareTaskId}
            />

            {selectedCareTask && (
                <AssignCareTaskForm
                    careTask={selectedCareTask}
                    setSelectedCareTask={setSelectedCareTask}
                />
            )}

            <Button
                onClick={() => setShowForm(true)}
            >
                Zorgtaak toevoegen
            </Button>

            {showForm && (
                <CreateCareTaskForm
                    addCareTask={addCareTask}
                    setShowForm={setShowForm}
                />
            )}
        </div>
    )
}

export default Zorgtaken;