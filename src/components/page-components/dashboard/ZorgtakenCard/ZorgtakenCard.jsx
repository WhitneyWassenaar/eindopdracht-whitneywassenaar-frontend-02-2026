import DashboardCard from "../DashboardCard/DashboardCard.jsx";

function ZorgtakenCard() {
    return (
        <DashboardCard
            title={"Zorgtaken"}
        >
            <ul className="zorgtaken-list">
                <li>
                    <span>Urgent: </span>
                    <strong>10</strong>
                </li>
                <li>
                    <span>Vandaag: </span>
                    <strong>10</strong>
                </li>
                <li>
                    <span>Gepland: </span>
                    <strong>10</strong>
                </li>
            </ul>
        </DashboardCard>
    );
}

export default ZorgtakenCard