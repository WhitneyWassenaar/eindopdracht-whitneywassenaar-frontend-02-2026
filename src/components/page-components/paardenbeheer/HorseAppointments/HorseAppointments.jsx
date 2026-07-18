// React
import {useContext, useEffect, useState} from "react";

// Components
import CreateAppointmentForm from "../../../forms/CreateAppointmentForm/CreateAppointmentForm.jsx";

// Context / Hooks
import {AuthContext} from "../../../authentication/context/AuthContext.jsx";

// Api
import api from "../../../../api/axios.js";

// CSS
import "./HorseAppointments.css";

function HorseAppointments({horse}) {
    const {token,user} = useContext(AuthContext);

    const [appointments, setAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [contacts,setContacts] = useState([]);

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

    useEffect(() => {

        if(!token) return;


        async function getContacts(){

            try {

                const response = await api.get(`/users/${user.id}/persons`,
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

                setContacts(response.data);

            } catch(error){
                console.error(error);
            }

        }
        getContacts();
    }, [token]);

    function getProfessionalName(professionalId){

        const professional = contacts.find(
            contact => Number(contact.id) === Number(professionalId)
        );


        if(!professional){
            return "Onbekend";
        }


        return `${professional.firstName} ${professional.lastName}`;

    }

    async function deleteAppointment(id) {

        if(!window.confirm("Weet je zeker dat je deze afspraak wilt verwijderen?"))
            return;

        try {
            await api.delete(`/appointments/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            setAppointments(previous =>
                previous.filter(
                    appointment => appointment.id !== id
                )
            );


        } catch(error){
            console.error(error);
        }

    }

    function dueAppointment(appointment) {

        const appointmentDateTime = new Date(
            `${appointment.date}T${appointment.time}`
        );

        return appointmentDateTime < new Date();
    }

    return (
        <div className="horse-appointments">
            <h2>
                Afspraken
            </h2>

            {appointments.length === 0 && !showForm &&(
                    <p>
                        Geen afspraken gepland.
                    </p>
            )}

            {showForm && (
                <CreateAppointmentForm
                    horse={horse}
                    onSaved={async () => {

                        const response = await api.get(`/horses/${horse.id}/appointments`,
                            {
                                headers:{
                                    Authorization:`Bearer ${token}`
                                }
                            }
                        );

                        setAppointments(response.data);
                        setShowForm(false);

                    }}
                />
            )}

            {!showForm && (
                <>
                    <div className="appointment-list">
                    {appointments.map((appointment)=>(

                        <div key={appointment.id}
                             className={dueAppointment(appointment)
                                ? "appointment-card due"
                                : "appointment-card"
                        }>

                            <p>
                                Datum: {appointment.date}
                            </p>

                            <p>
                                Tijd:
                                {appointment.time}
                            </p>

                            <p>
                                Categorie:
                                {appointment.professionalType}
                            </p>

                            <p>
                                Professional:
                                {getProfessionalName(appointment.professionalId)}
                            </p>



                            <p>
                                Reden:
                                {appointment.reason}
                            </p>


                            <button
                                onClick={() => deleteAppointment(appointment.id)}
                            >
                                Afspraak verwijderen
                            </button>

                        </div>

                    ))}
                    </div>
                </>
            )}

            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                >
                    Nieuwe afspraak toevoegen
                </button>
            )}
        </div>
    );
}

export default HorseAppointments;