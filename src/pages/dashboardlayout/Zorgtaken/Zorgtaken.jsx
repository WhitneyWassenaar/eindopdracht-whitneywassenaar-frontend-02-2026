// React
import {useContext, useEffect, useState} from "react";

// CSS
import './Zorgtaken.css'
import api from "../../../api/axios.js";
import {AuthContext} from "../../../components/authentication/context/AuthContext.jsx";
import CreateCareTaskForm from "../../../components/forms/CreateCareTaskForm/CreateCareTaskForm.jsx";


function Zorgtaken() {
    const {token,user} = useContext(AuthContext);
    const [careTasks, setCareTasks] = useState([]);

    function addCareTask(newCareTask) {
        setCareTasks(previousTasks => [
            ...previousTasks,
            newCareTask
        ]);
    }

    useEffect(() => {
        if(!token || !user) return;

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

    },[token,user])

    return (
        <>
            <div className="dashboard-page">
                <h1>Zorgtaken</h1>
                {careTasks.length === 0 ? (
                    <p>Geen zorgtaken gevonden</p>
                ):(
                    careTasks.map(task => (
                            <div key={task.id}>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                        ))
                )}

                <CreateCareTaskForm
                onSubmit={addCareTask}/>

            </div>
        </>
    );
}

export default Zorgtaken;