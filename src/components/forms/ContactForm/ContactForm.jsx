// React
import {useState} from 'react';

// Components
import Button from '../../ui/Button/Button.jsx';

// CSS
import './ContactForm.css';

function ContactForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")
    const [succes, setSucces] = useState("")
    const [error, setError] = useState("");

    function onFormSubmit(e) {
        e.preventDefault();
        setError("");
        setSucces("");

        setSucces("Bedankt voor je bericht!");

        setName("")
        setEmail("")
        setMessage("")
    }

    return (
        <form
            className="contact-form"
            onSubmit={onFormSubmit}
        >
            <label className="label">Naam</label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                type="text"
                id="name"
                name="name"
                required
                minLength="2"
                maxLength="12"
                size="12"
            />
            <label className="label">E-mail</label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                type="email"
                id="e-mail"
                name="e-mail"
                required
                size="30"
            />
            <label className="label">Bericht</label>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="text-area"
                id="contact-message"
                name="contact-message"
                rows="10"
                required
                placeholder="Begin hier met het schrijven van jouw bericht...">
            </textarea>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {succes && (
                <p className="succes-message">
                    {succes}
                </p>
            )}
            <Button
                type={"submit"}
                variant={"default"}
            >
                Verzenden
            </Button>
        </form>
    );
}

export default ContactForm;