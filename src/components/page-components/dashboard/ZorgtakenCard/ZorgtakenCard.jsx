// Components
import DashboardCard from '../DashboardCard/DashboardCard.jsx';

// CSS
import "./ZorgtakenCard.css";

function ZorgtakenCard({tasks}) {
    const today = new Date().toISOString().split("T")[0];

    const urgentTasks = tasks.filter(
        task => !task.completed && task.dueDate < today
    ).length;

    const todayTasks = tasks.filter(
        task => !task.completed && task.dueDate === today
    ).length;

    const plannedTasks = tasks.filter(
        task => !task.completed && task.dueDate > today
    ).length;
    return (
        <DashboardCard
            title={"Zorgtaken"}
        >
            <ul className="zorgtaken-list">
                <li>
                    <span>Urgent: </span>
                    <strong>{urgentTasks}</strong>
                </li>
                <li>
                    <span>Vandaag: </span>
                    <strong>{todayTasks}</strong>
                </li>
                <li>
                    <span>Gepland: </span>
                    <strong>{plannedTasks}</strong>
                </li>
            </ul>
        </DashboardCard>
    );
}

export default ZorgtakenCard