// React
import {useContext, useEffect, useState} from "react";

// Helper
import getTodayDate from "../../../helpers/getTodayDate.js";

// Context / Hooks
import {AuthContext} from "../../../context/AuthContext.jsx";

// Services
import { getContacts } from "../../../services/contactService.js";
import { createAppointment } from "../../../services/appointmentService.js";

// CSS
import "./CreateAppointmentForm.css";

function CreateAppointmentForm({horse, onSaved}) {
    const {token, user} = useContext(AuthContext);
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({
        professionalType: "",
        professionalId: "",
        date: "",
        time: "",
        reason: ""
    });
    const [message, setMessage] = useState("");

    const [loadingContacts, setLoadingContacts] = useState(false);
    const [contactsError, setContactsError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!user || !token) return;

        const controller = new AbortController();

        async function loadContacts() {
            try {
                setLoadingContacts(true);
                setContactsError("");

                const contactsData = await getContacts(
                    user.id,
                    token,
                    controller.signal
                );

                setContacts(contactsData);
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

        loadContacts();

        return () => {
            controller.abort();
        };
    }, [token, user]);

    function handleChange(e) {
        const {name, value} = e.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const now = new Date();

        const appointmentDateTime = new Date(
            `${formData.date}T${formData.time}`
        );

        if (appointmentDateTime < now) {
            setMessage("Je kunt geen afspraak in het verleden maken.");
            return;
        }

        try {
            setIsSaving(true);
            setMessage("");

            await createAppointment(
                {
                    userId: user.id,
                    horseId: horse.id,
                    professionalType: formData.professionalType,
                    professionalId: Number(formData.professionalId),
                    date: formData.date,
                    time: formData.time,
                    reason: formData.reason
                },
                token
            );

            setMessage("Afspraak opgeslagen");

            if (onSaved) {
                onSaved();
            }
        }
        catch (error) {
            console.error(error);
            setMessage("Opslaan mislukt");
        } finally {
            setIsSaving(false);
        }
    }

    const filteredProfessionals = contacts.filter(contact => contact.role === formData.professionalType);

    return (
        <form onSubmit={handleSubmit} className="createappointment-form-layout">

            <div className="form-row">
                <label htmlFor="appointment-date">
                    Datum
                </label>
                <input
                    id="appointment-date"
                    type="date"
                    name="date"
                    value={formData.date}
                    min={getTodayDate()}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <label htmlFor="appointment-time">
                    Tijd
                </label>
                <input
                    id="appointment-time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <label htmlFor="professional-type">
                    Professional
                </label>
                <select
                    id="professional-type"
                    name="professionalType"
                    value={formData.professionalType}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Kies professional
                    </option>

                    <option value="Dierenarts">
                        Dierenarts
                    </option>

                    <option value="Hoefsmid">
                        Hoefsmid
                    </option>

                    <option value="Trainer">
                        Trainer
                    </option>

                </select>
            </div>

            <div className="form-row">
                <label htmlFor="professional-name">
                    Naam professional
                </label>

                {loadingContacts ? (
                    <p>Contacten worden geladen...</p>
                ) : contactsError ? (
                    <p className="error-message">{contactsError}</p>
                ) : filteredProfessionals.length === 0 ? (
                    <p>Geen contacten beschikbaar voor dit type professional.</p>
                ) : (
                    <select
                        id="professional-name"
                        name="professionalId"
                        value={formData.professionalId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Kies contact</option>

                        {filteredProfessionals.map(contact => (
                            <option key={contact.id} value={contact.id}>
                                {contact.firstName} {contact.lastName}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="form-row">
                <label htmlFor="appointment-reason">
                    Reden afspraak
                </label>
                <textarea
                    id="appointment-reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" disabled={isSaving}>
                {isSaving ? "Bezig met opslaan..." : "Opslaan"}
            </button>

            {message && (
                <p>
                    {message}
                </p>
            )}
        </form>
    );
}

export default CreateAppointmentForm;