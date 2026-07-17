// React
import {useContext, useEffect, useState} from "react";

// API
import api from "../../../../api/axios.js";

// Context
import {AuthContext} from "../../../authentication/context/AuthContext.jsx";

// CSS
import "./HorseCareTasks.css";

function HorseCareTasks({horse}) {
    const {token} = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        if (!horse || !token) return;

        async function getAssignments() {
            try {

                const response = await api.get(
                    `/horses/${horse.id}/careTaskAssignments`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const assignments = response.data;

                const assignmentsWithTasks = await Promise.all(
                    assignments.map(async (assignment) => {

                        const taskResponse = await api.get(
                            `/careTasks/${assignment.careTaskId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );

                        return {
                            ...assignment,
                            careTask: taskResponse.data
                        };
                    })
                );

                setAssignments(assignmentsWithTasks);

            } catch(error) {
                console.error(error);
            }
        }

        getAssignments();

    }, [horse, token]);

    async function completeTask(id) {
        await api.patch(
            `/careTaskAssignments/${id}`,
            {
                completed: true
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        setAssignments(previous =>
            previous.map(task =>
                task.id === id
                    ? {...task, completed:true}
                    : task
            )
        );
    }



    return (
        <div className="horse-caretasks">

            <h2>
                Zorgtaken
            </h2>

            {assignments.length === 0 && (
                <p>
                    Geen zorgtaken toegewezen.
                </p>
            )}
<div className="caretask-list">
            {assignments
                .sort((a, b) => {

                    // Eerst open taken
                    if (a.completed !== b.completed) {
                        return a.completed ? 1 : -1;
                    }

                    // Daarna sorteren op einddatum (oudste eerst)
                    return new Date(a.dueDate) - new Date(b.dueDate);

                }).map((assignment)=>(

                <div
                    key={assignment.id}
                    className="caretask-card"
                >
                    <h3>
                        {assignment.careTask?.title
                            || "Zorgtaak"}
                    </h3>
                    <p>
                        {assignment.careTask?.description}
                    </p>
                    <p>
                        Einddatum: {assignment.dueDate}
                    </p>
                    <p>
                        Status:{" "}
                        {
                            assignment.completed
                                ? "Voltooid"
                                : "Open"
                        }
                    </p>

                    {!assignment.completed && (
                        <button
                            onClick={() => completeTask(assignment.id)}
                        >
                            Voltooien
                        </button>
                    )}
                </div>
            ))}
        </div>
        </div>
    );
}

export default HorseCareTasks;