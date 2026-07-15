// React
import {useState, useContext} from 'react';

// Components
import Button from '../../ui/Button/Button.jsx';

// Context / Hooks
import {AuthContext} from "../../authentication/context/AuthContext.jsx";

// Data
import projectId from '../../../data/projectId.js';
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

    async function createContactFormSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/persons",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "novi-education-project-id": projectId,
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phone: phoneNumber,
                        active: true,
                        role: role,
                        photo: contactPhoto || defaultContactPhoto,
                    })
                }
            );

            const newContact = await response.json();

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

                <Button
                    type={"submit"}
                >
                    Paardenprofiel aanmaken
                </Button>
            </fieldset>
        </form>
    );
}

export default CreateContactProfileForm;