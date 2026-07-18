// React
import {useContext, useEffect, useState} from "react";

// Context / Hooks
import {AuthContext} from "../../../authentication/context/AuthContext.jsx";
// Data

// Api
import api from "../../../../api/axios.js";

// CSS
import "./HorseAppointments.css";

function HorseAppointments({horse}) {
    const {token} = useContext(AuthContext);

    const [appointments, setAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if(!horse || !token) return;

        async function getAppointments(){
            try {

                const response = await api.get(`/horses/${horse.id}/appointments`,
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

                console.log("Afspraken:", response.data);
                setAppointments(response.data);

            } catch(error){
                console.error(error);
            }
        }

        getAppointments();

    }, [horse, token]);

    return (
        <div className="horse-appointments">
            <h2>
                Afspraken
            </h2>

            {appointments.length === 0 && !showForm &&(
                <>
                    <p>
                        Geen afspraken gepland.
                    </p>

                    <button
                        onClick={() => setShowForm(true)}
                    >
                        Nieuwe afspraak
                    </button>
                </>
            )}

            {showForm && (
                <CreateAppointmentForm
                    horse={horse}
                    setShowForm={setShowForm}
                    setAppointments={setAppointments}
                />
            )}

            {appointments.map((appointment)=>(
                <div key={appointment.id}>
                    <p>
                        Datum: {appointment.date}
                    </p>

                    <p>
                        Professional:
                        {appointment.professionalType}
                    </p>

                    <p>
                        Reden:
                        {appointment.reason}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default HorseAppointments;