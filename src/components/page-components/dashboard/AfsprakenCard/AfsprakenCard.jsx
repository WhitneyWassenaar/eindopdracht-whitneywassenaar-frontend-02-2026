// Components
import DashboardCard from '../DashboardCard/DashboardCard.jsx';

// CSS
import './AfsprakenCard.css';

function AfsprakenCard({appointments = []}) {
    const today = new Date().toISOString().split("T")[0];

    const upcomingAppointments = appointments.filter(
        appointment => appointment.date >= today
    );

    const treatments = upcomingAppointments.filter(
        appointment =>
            appointment.professionalType === "Dierenarts" ||
            appointment.professionalType === "Hoefsmid"
    ).length;

    const trainings = upcomingAppointments.filter(
        appointment =>
            appointment.professionalType === "Trainer"
    ).length;

    return (
        <DashboardCard
            title="Afspraken"
        >
            <ul className="afspraken-list">
                <li>
                    <span>Aankomende afspraken:</span>
                    <strong>{upcomingAppointments.length}</strong>
                </li>
                <li>
                    <span>Behandelingen:</span>
                    <strong>{treatments}</strong>
                </li>
                <li>
                    <span>Trainingen:</span>
                    <strong>{trainings}</strong>
                </li>
            </ul>
        </DashboardCard>
    );
}

export default AfsprakenCard;