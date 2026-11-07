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

    const [loadingAppointments, setLoadingAppointments] = useState(false);
    const [appointmentsError, setAppointmentsError] = useState("");
    const [loadingContacts, setLoadingContacts] = useState(false);
    const [contactsError, setContactsError] = useState("");

    const [deletingAppointment, setDeletingAppointment] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        if (!horse || !token) return;

        const horseId = horse.id;
        const controller = new AbortController();

        async function fetchAppointments() {
            try {
                setLoadingAppointments(true);
                setAppointmentsError("");

                const data = await getHorseAppointments(
                    horseId,
                    token,
                    controller.signal
                );

                setAppointments(data);
            } catch (error) {
                if (
                    error.name === "CanceledError" ||
                    error.name === "AbortError"
                ) {
                    return;
                }

                console.error("Afspraken ophalen mislukt:", error);
                setAppointmentsError("Het ophalen van de afspraken is mislukt.");
            } finally {
                if (!controller.signal.aborted) {
                    setLoadingAppointments(false);
                }
            }
        }

        fetchAppointments();

        return () => {
            controller.abort();
        };
    }, [horse?.id, token]);

    useEffect(() => {
        if (!token || user?.id == null) return;

        const controller = new AbortController();

        async function fetchContacts() {
            try {
                setLoadingContacts(true);
                setContactsError("");

                const data = await getUserContacts(
                    user.id,
                    token,
                    controller.signal
                );

                setContacts(data);
            } catch (error) {
                if (
                    error.name === "CanceledError" ||
                    error.name === "AbortError"
                ) {
                    return;
                }

                console.error("Contacten ophalen mislukt:", error);
                setContactsError("Het ophalen van de contacten is niet gelukt.");
            } finally {
                if (!controller.signal.aborted) {
                    setLoadingContacts(false);
                }
            }
        }

        fetchContacts();

        return () => {
            controller.abort();
        };
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
            setDeletingAppointment(true);
            setDeleteError("");

            await deleteAppointment(id, token);

            setAppointments(previous =>
                previous.filter(appointment => appointment.id !== id)
            );
        } catch (error) {
            console.error("Afspraak verwijderen mislukt:", error);
            setDeleteError("Het verwijderen van de afspraak is mislukt.");
        } finally {
            setDeletingAppointment(false);
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
            {deleteError && (
                <p className="error-message">{deleteError}</p>
            )}

            {!showForm && loadingAppointments && (
                <p>Afspraken worden geladen...</p>
            )}

            {!showForm && appointmentsError && (
                <p className="error-message">{appointmentsError}</p>
            )}

            {!showForm && !loadingAppointments && !appointmentsError && appointments.length === 0 && (
                <p>Geen afspraken gepland.</p>
            )}

            {showForm && loadingContacts && (
                <p>Contacten worden geladen...</p>
            )}

            {showForm && contactsError && (
                <p className="error-message">{contactsError}</p>
            )}

            {showForm && (

                <CreateAppointmentForm
                    horse={horse}
                    onSaved={async () => {
                        try {
                            setLoadingAppointments(true);
                            setAppointmentsError("");

                            const data = await getHorseAppointments(horse.id, token);
                            setAppointments(data);
                            setShowForm(false);
                        } catch (error) {
                            console.error("Afspraken opnieuw ophalen mislukt:", error);
                            setAppointmentsError("De afspraak is opgeslagen, maar het ophalen van de afspraken is mislukt.");
                        } finally {
                            setLoadingAppointments(false);
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
                                Tijd: {appointment.time}
                            </p>

                            <p>
                                Categorie: {appointment.professionalType}
                            </p>

                            <p>
                                Professional: {getProfessionalName(appointment.professionalId)}
                            </p>

                            <p>
                                Reden: {appointment.reason}
                            </p>

                            <button
                                onClick={() => handleDeleteAppointment(appointment.id)}
                                disabled={deletingAppointment}
                            >
                                {deletingAppointment ? "Bezig met verwijderen..." : "Afspraak verwijderen"}
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