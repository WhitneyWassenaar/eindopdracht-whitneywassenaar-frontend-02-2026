import './Dashboard.css'

import PaardenverdelingCard from "../../../components/page-components/dashboard/PaardenverdelingCard/Paardenverdeling.jsx";
import ZorgtakenCard from "../../../components/page-components/dashboard/ZorgtakenCard/ZorgtakenCard.jsx";
import AfsprakenCard from "../../../components/page-components/dashboard/AfsprakenCard/AfsprakenCard.jsx";

function Dashboard() {
    return (
        <>
            <div className="dashboard-page">
                <h1>Welkom naam</h1>
                <div className="dashboard-card-container">
                    <PaardenverdelingCard/>
                    <ZorgtakenCard/>
                    <AfsprakenCard/>
                </div>
            </div>
        </>
    );
}

export default Dashboard;

//TODO:
// Data gebruiken voor aantallen van cards

// alle paginas voorzien van componenten en dat de coponentn zo zijn gestructureerd dat odnerdelen makkelijk vervangen kan worden door data