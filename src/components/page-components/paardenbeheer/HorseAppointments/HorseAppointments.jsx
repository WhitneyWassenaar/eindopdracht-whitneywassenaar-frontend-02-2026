// React
import {useContext, useEffect, useState} from "react";

// Components
import CreateAppointmentForm from "../../../forms/CreateAppointmentForm/CreateAppointmentForm.jsx";

// Context / Hooks
import {AuthContext} from "../../../../context/AuthContext.jsx";

// Services
import {
    getHorseAppointments, getUserContacts, deleteAppointment} from "../../../../services/appointmentService.js";

// CSS
import "./HorseAppointments.css";

function HorseAppointments({horse}) {
    const {token,user} = useContext(AuthContext);

    const [appointments, setAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [contacts,setContacts] = useState([]);

    useEffect(() => {
        if (!horse || !token) return;

        async function fetchAppointments() {
            try {
                const data = await getHorseAppointments(horse.id, token);
                setAppointments(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAppointments();
    }, [horse, token]);

    useEffect(() => {
        if (!token || !user?.id) return;

        async function fetchContacts() {
            try {
                const data = await getUserContacts(user.id, token);
                setContacts(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchContacts();
    }, [token, user?.id]);

    function getProfessionalName(professionalId){

        const professional = contacts.find(
            contact => Number(contact.id) === Number(professionalId)
        );


        if(!professional){
            return "Onbekend";
        }


        return `${professional.firstName} ${professional.lastName}`;

    }

    async function handleDeleteAppointment(id) {
        if (!window.confirm("Weet je zeker dat je deze afspraak wilt verwijderen?")) {
            return;
        }

        try {
            await deleteAppointment(id, token);

            setAppointments(previous =>
                previous.filter(appointment => appointment.id !== id)
            );
        } catch (error) {
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
                        try {
                            const data = await getHorseAppointments(horse.id, token);
                            setAppointments(data);
                            setShowForm(false);
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                />
            )}

            {!showForm && (

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
                                onClick={() => handleDeleteAppointment(appointment.id)}
                            >
                                Afspraak verwijderen
                            </button>

                        </div>

                    ))}
                    </div>

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