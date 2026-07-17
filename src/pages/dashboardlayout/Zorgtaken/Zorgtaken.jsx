// React
import {useContext, useEffect, useState} from "react";

// CSS
import './Zorgtaken.css'
import api from "../../../api/axios.js";
import {AuthContext} from "../../../components/authentication/context/AuthContext.jsx";
import CareTasksTable from "../../../components/page-components/zorgtaken/CareTasksTable/CareTasksTable.jsx";
import CreateCareTaskForm from "../../../components/forms/CreateCareTaskForm/CreateCareTaskForm.jsx";
import Button from "../../../components/ui/Button/Button.jsx";

function Zorgtaken() {
    const {token, user} = useContext(AuthContext);
    const [careTasks, setCareTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);

    function addCareTask(newCareTask) {
        setCareTasks(previousTasks => [
            ...previousTasks,
            newCareTask
        ]);
    }

    async function deleteCareTask(id) {
        if (!window.confirm("Weet je zeker dat je deze zorgtaak wilt verwijderen?"))
            return;
        try {
            await api.delete(`/careTasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCareTasks((previousTasks) =>
                previousTasks.filter((task) => task.id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!token || !user) return;

        async function getCareTasks() {
            try {
                const careTasksData = await api.get(`/users/${user.id}/careTasks`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                setCareTasks(careTasksData.data);
            } catch (error) {
                console.error(error);
            }
        }

        getCareTasks();

    }, [token, user])

    return (
        <>
            <div className="dashboard-page">
                <h1>Zorgtaken</h1>


                <CareTasksTable
                    careTasks={careTasks}
                    deleteCareTask={deleteCareTask}/>

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
        </>
    )
}

export default Zorgtaken;