// React
import {useContext, useState} from 'react';

// Components
import Button from '../../ui/Button/Button.jsx';

// Context
import {AuthContext} from "../../authentication/context/AuthContext.jsx";

// Api
import api from "../../../api/axios.js";

// Data
import roles from "../../../data/roles.js";


// CSS
import './CreateContactProfileForm.css';

function CreateContactProfileForm({setContacts, setShowForm}) {
    const {token} = useContext(AuthContext);
    const defaultContactPhoto = "/defaultContactPhoto.png"

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [contactPhoto, setContactPhoto] = useState("");
    const [error, setError] = useState("");

    async function createContactFormSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/persons",
                {
                    firstName,
                    lastName,
                    email,
                    phone: phoneNumber,
                    active: true,
                    role,
                    photo: contactPhoto || defaultContactPhoto
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const newContact = response.data;

            setContacts(previousContacts => [
                ...previousContacts,
                newContact
            ]);

            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setContactPhoto("");

            setShowForm(false);
            console.log("Nieuwe contact:", newContact);

        } catch (error) {
            console.error(error)
            setError(error.response?.data?.error || "Er is iets mis gegaan..")
        }
    }

    return (
        <form onSubmit={createContactFormSubmit} className="create-contact-profile-form-layout">
            <fieldset>
                <legend>Contactgegevens</legend>
                <div className="form-row">
                    <label>Voornaam</label>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        id={"first-name"}
                        type={"text"}
                        maxLength={20}
                        placeholder={"Voer voornaam in"}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Achternaam</label>
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        id={"last-name"}
                        type={"text"}
                        maxLength={20}
                        placeholder={"Voer achternaam in"}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id={"email"}
                        type={"email"}
                        maxLength={20}
                        placeholder={"Voer email in"}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Telefoonnummer</label>
                    <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        id={"phoneNumber"}
                        type={"text"}
                        maxLength={20}
                        placeholder={"Voer telefoonnummer in"}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Rol</label>
                    <select
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        id="role"
                        required
                    >
                        <option
                            value="">
                            Selecteer een rol
                        </option>
                        {roles.map((role) => (
                            <option
                                key={role}
                                value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <label>Foto</label>
                    <p>Url afbeelding:</p>
                    <input
                        id="contact-photo"
                        type="url"
                        placeholder="Plaats URL van afbeelding"
                        value={contactPhoto}
                        onChange={(event) => setContactPhoto(event.target.value)}
                    />
                </div>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <Button
                    type={"submit"}
                >
                    Contactprofiel aanmaken
                </Button>
            </fieldset>
        </form>
    );
}

export default CreateContactProfileForm;