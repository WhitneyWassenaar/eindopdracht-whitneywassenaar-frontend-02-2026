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

                const response = await api.get(`/horses/${horse.id}/careTaskAssignments`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const assignments = response.data;
                console.log("Assignments:", assignments);

                const tasksResponse = await api.get(`/careTasks`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const careTasks = tasksResponse.data;

                const assignmentsWithTasks = assignments.map((assignment) => ({
                    ...assignment,
                    careTask: careTasks.find(
                        task => task.id === assignment.careTaskId
                    )
                }));

                setAssignments(assignmentsWithTasks);

            } catch (error) {
                console.error(error);
            }
        }

        getAssignments();

    }, [horse, token]);

    async function completeTask(id) {
        await api.patch(`/careTaskAssignments/${id}`,
            {
                completed: true
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setAssignments(previous =>
            previous.map(task =>
                task.id === id
                    ? {...task, completed: true}
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

                        if (a.completed !== b.completed) {
                            return a.completed ? 1 : -1;
                        }

                        return new Date(a.dueDate) - new Date(b.dueDate);

                    }).map((assignment) => (

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