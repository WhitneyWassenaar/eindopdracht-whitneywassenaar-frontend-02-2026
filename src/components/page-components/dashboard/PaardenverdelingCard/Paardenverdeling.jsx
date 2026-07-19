// Components
import DashboardCard from '../DashboardCard/DashboardCard.jsx';

function PaardenverdelingCard({horses,boxes}) {
    const stableCapacity = boxes?.length || 0;

    const horsesInStable = horses?.filter(
        horse => horse.location === "stal"
    ).length || 0;

    const horsesInPasture = horses?.filter(
        horse => horse.location === "wei"
    ).length || 0;


    return (
        <DashboardCard
            title={"Paardenverdeling"}
        >
            <ul className="paardenverdeling-list">
                <li>
                    <span>Stal capaciteit: </span>
                    <strong>{stableCapacity}</strong>
                </li>
                <li>
                    <span>Paarden op stal: </span>
                    <strong>{horsesInStable}</strong>
                </li>
                <li>
                    <span>Paarden op de wei: </span>
                    <strong>{horsesInPasture}</strong>
                </li>
            </ul>
        </DashboardCard>
    );
}

export default PaardenverdelingCard