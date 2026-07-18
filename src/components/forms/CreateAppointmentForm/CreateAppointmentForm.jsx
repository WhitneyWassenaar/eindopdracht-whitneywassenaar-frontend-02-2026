// React
import {useContext, useEffect, useState} from "react";

// Components

// Context / Hooks
import {AuthContext} from "../../authentication/context/AuthContext.jsx";

// Api
import api from "../../../api/axios.js";

// CSS
import"./CreateAppointmentForm.css";

function CreateAppointmentForm({horse, onSaved}) {
    const {token, user} = useContext(AuthContext);

    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({
        professionalType: "",
        professionalId: "",
        date: "",
        reason: ""
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!horse || !token) return;

        async function getContacts() {
            try {

                const response = await api.get(`/users/${user.id}/persons`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setContacts(response.data);

            } catch (error) {
                console.error(error);
            }
        }

        getContacts();
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
        try {
            await api.post("/appointments",
                {
                    userId: user.id,
                    horseId: horse.id,
                    professionalType: formData.professionalType,
                    professionalId: Number(formData.professionalId),
                    date: formData.date,
                    reason: formData.reason
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Afspraak opgeslagen")

            if (onSaved) {
                onSaved();
            }


        } catch (error) {

            console.error(error);
            setMessage("Opslaan mislukt");

        }
    }

               const filteredProfessionals = contacts.filter(contact => contact.role === formData.professionalType);


    return (

        <form onSubmit={handleSubmit} className="createappointment-form-layout">

            <div className="form-row">
                <label>
                   Datum
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Professional
                    <select
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

                    </select>

                </label>
            </div>

            <div className="form-row">
                <label>
                    Naam professional
                    <select
                        name="professionalId"
                        value={formData.professionalId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Kies contact
                        </option>

                        {filteredProfessionals.map(contact => (

                            <option
                                key={contact.id}
                                value={contact.id}
                            >
                                {contact.firstName} {contact.lastName}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="form-row">
                <label>
                    Reden afspraak

                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    />

                </label>
            </div>

            <button type="submit">
                Opslaan
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