// React
import {useContext, useEffect, useState} from "react";

// Context
import {AuthContext} from "../../../../context/AuthContext.jsx";

// Services
import {getHorseCareTaskAssignments, getCareTasks, completeCareTaskAssignment} from "../../../../services/careTaskAssignmentService.js";

// CSS
import "./HorseCareTasks.css";

function HorseCareTasks({horse}) {
    const {token} = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);

    const horseId = horse?.id;

    useEffect(() => {
        if (!horseId || !token) return;

        async function getAssignments() {
            try {
                const assignments = await getHorseCareTaskAssignments(
                    horseId,
                    token
                );

                const careTasks = await getCareTasks(token);

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

    }, [horseId, token]);

    async function completeTask(id) {
        try {
            await completeCareTaskAssignment(id, token);

            setAssignments(previous =>
                previous.map(task =>
                    task.id === id
                        ? { ...task, completed: true }
                        : task
                )
            );

        } catch (error) {
            console.error(error);
        }
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
                {[...assignments]
                    .sort((a, b) => {

                        if (a.completed !== b.completed) {
                            return a.completed ? 1 : -1;
                        }

                        return new Date(a.dueDate) - new Date(b.dueDate);

                    }).map((assignment) => (

                        <article
                            key={assignment.id}
                            className="caretask-card"
                        >
                            <h3>
                                {assignment.careTaskTitle
                                    || assignment.careTask?.title
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
                        </article>
                    ))}
            </div>
        </div>
    );
}

export default HorseCareTasks;