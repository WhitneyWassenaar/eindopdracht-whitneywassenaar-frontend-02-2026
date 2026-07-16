// React
import {useContext} from "react";

// Context
import {AuthContext} from "../../../components/authentication/context/AuthContext.jsx";

// Components
import PaardenverdelingCard from '../../../components/page-components/dashboard/PaardenverdelingCard/Paardenverdeling.jsx';
import ZorgtakenCard from '../../../components/page-components/dashboard/ZorgtakenCard/ZorgtakenCard.jsx';
import AfsprakenCard from '../../../components/page-components/dashboard/AfsprakenCard/AfsprakenCard.jsx';

// CSS
import './Dashboard.css'

function Dashboard() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <div className="dashboard-page">
                <h1>
                    Hallo {user.firstName} {user.lastName}
                </h1>
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