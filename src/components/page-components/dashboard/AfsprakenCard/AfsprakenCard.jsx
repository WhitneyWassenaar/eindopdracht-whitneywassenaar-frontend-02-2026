// Components
import DashboardCard from '../DashboardCard/DashboardCard.jsx';

function AfsprakenCard() {
    return (
        <DashboardCard
            title={"Afspraken"}
        >
            <ul className="afspraken-list">
                <li>Aankomende afspraken:</li>
                <li>Behandelingen:</li>
                <li>Trainingen:</li>
            </ul>
        </DashboardCard>
    );
}

export default AfsprakenCard;