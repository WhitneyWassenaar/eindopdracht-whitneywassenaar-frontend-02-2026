// React
import {useContext, useEffect, useState} from "react";

// Context
import {AuthContext} from "../../../context/AuthContext.jsx";

// Services
import {getDashboardData} from "../../../services/dashboardService.js";

// Components
import PaardenverdelingCard from '../../../components/page-components/dashboard/PaardenverdelingCard/Paardenverdeling.jsx';
import ZorgtakenCard from '../../../components/page-components/dashboard/ZorgtakenCard/ZorgtakenCard.jsx';
import AfsprakenCard from '../../../components/page-components/dashboard/AfsprakenCard/AfsprakenCard.jsx';

// CSS
import './Dashboard.css'

function Dashboard() {
    const {user, token} = useContext(AuthContext);
    const [horses, setHorses] = useState([]);
    const [boxes, setBoxes] = useState([]);
    const [careTasks, setCareTasks] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token || !user) return;

        async function fetchDashboardData() {
            try {
                setIsLoading(true);
                setError("");

                const data = await getDashboardData(user.id, token);

                setHorses(data.horses);
                setBoxes(data.boxes);
                setAppointments(data.appointments);
                setCareTasks(data.careTasks);

            } catch (error) {
                console.error("Dashboard data ophalen mislukt:", error);
                setError("Het ophalen van de dashboardgegevens is mislukt.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchDashboardData();
    }, [token, user]);

    if (!user) return null;

    return (
        <div className="dashboard-page">
            <h1 className="dashboard-page-title">
                Hallo {user.firstName} {user.lastName}
            </h1>

            <h2 className="dashboard-page-heading">
                Overzicht van {user.stableName}
            </h2>
            {isLoading && <p>Dashboardgegevens worden geladen...</p>}

            {error && (
                <p className="error-message">{error}</p>
            )}

            <div className="dashboard-card-container">
                <PaardenverdelingCard
                    horses={horses}
                    boxes={boxes}
                />
                <ZorgtakenCard
                    tasks={careTasks}
                />
                <AfsprakenCard
                    appointments={appointments}
                />
            </div>
        </div>
    );
}

export default Dashboard;