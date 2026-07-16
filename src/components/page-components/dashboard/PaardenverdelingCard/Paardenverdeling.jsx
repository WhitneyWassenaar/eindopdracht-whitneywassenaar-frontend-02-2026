// Components
import DashboardCard from '../DashboardCard/DashboardCard.jsx';

function PaardenverdelingCard() {

    return (
        <DashboardCard
            title={"Paardenverdeling"}
        >
            <ul className="paardenverdeling-list">
                <li>
                    <span>Stal capaciteit: </span>
                    <strong>10</strong>
                </li>
                <li>
                    <span>Paarden op stal: </span>
                    <strong>10</strong>
                </li>
                <li>
                    <span>Paarden op de wei: </span>
                    <strong>10</strong>
                </li>
            </ul>
        </DashboardCard>
    );
}

export default PaardenverdelingCard