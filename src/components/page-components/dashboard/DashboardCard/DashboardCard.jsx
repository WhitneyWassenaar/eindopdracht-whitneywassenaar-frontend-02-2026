// CSS
import './DashboardCard.css';

function DashboardCard({
                           title,
                           children
                       }) {
    return (
        <div className="dashboard-card">
            <h2 className="dashboard-card-heading">{title}</h2>
            {children}
        </div>
    );
}

export default DashboardCard;