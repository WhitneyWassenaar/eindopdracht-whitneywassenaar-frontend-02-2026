// React
import {useContext,useEffect,useState} from "react";

// Context
import {AuthContext} from "../../../components/authentication/context/AuthContext.jsx";

// Components
import PaardenverdelingCard from '../../../components/page-components/dashboard/PaardenverdelingCard/Paardenverdeling.jsx';
import ZorgtakenCard from '../../../components/page-components/dashboard/ZorgtakenCard/ZorgtakenCard.jsx';
import AfsprakenCard from '../../../components/page-components/dashboard/AfsprakenCard/AfsprakenCard.jsx';

// Api
import api from "../../../api/axios.js";

// CSS
import './Dashboard.css'


function Dashboard() {
    const { user, token } = useContext(AuthContext);

    const [horses, setHorses] = useState([]);
    const [boxes, setBoxes] = useState([]);
    const [careTasks, setCareTasks] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        async function fetchDashboardData() {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                const horsesResponse = await api.get(`/users/${user.id}/horses`, { headers });
                console.log("Dashboard paarden:", horsesResponse.data);

                const horses = horsesResponse.data;
                setHorses(horses);

                const boxesResponse = await api.get(`/users/${user.id}/boxes`, { headers });
                setBoxes(boxesResponse.data);

                const appointmentsResponse = await api.get(`/users/${user.id}/appointments`, {
                    headers
                });

                setAppointments(
                    appointmentsResponse.data.filter(appointment =>
                        horses.some(horse => horse.id === appointment.horseId)
                    )
                );

                const careTaskAssignmentResponse = await api.get(`/careTaskAssignments`,
                    { headers }
                );

                setCareTasks(
                    careTaskAssignmentResponse.data.filter(task =>
                        horses.some(horse => horse.id === task.horseId)
                    )
                );

            } catch (error) {
                console.error(
                    "Dashboard data ophalen mislukt:",
                    error
                );
            }
        }


        if(token && user){
            fetchDashboardData();
        }

    }, [token, user]);

    return (
        <>
            <div className="dashboard-page">
                <h1>
                    Hallo {user.firstName} {user.lastName}
                </h1>

                <h2>Overzicht van {user.stableName}</h2>




                <div className="dashboard-card-container">
                    <PaardenverdelingCard
                    horses={horses}
                    boxes={boxes}/>
                    <ZorgtakenCard
                    tasks={careTasks}/>
                    <AfsprakenCard
                    appointments={appointments}/>
                </div>
            </div>
        </>
    );
}

export default Dashboard;