// React
import {useState} from 'react';

// Components
import Button from '../../ui/Button/Button.jsx';

// CSS
import './ContactForm.css';

function ContactForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");

    function onFormSubmit(e) {
        e.preventDefault();
        setSuccess("");

        setSuccess("Bericht succesvol verzonden!");

        setName("");
        setEmail("");
        setMessage("");
    }

    return (
        <form
            className="contact-form"
            onSubmit={onFormSubmit}
        >
            <label htmlFor="name" className="contact-form-label">Naam</label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="contact-form-input"
                type="text"
                id="name"
                name="name"
                required
                minLength="2"
                maxLength="50"
            />
            <label htmlFor="e-mail" className="contact-form-label">E-mail</label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="contact-form-input"
                type="email"
                id="e-mail"
                name="e-mail"
                maxLength="50"
                required

            />
            <label htmlFor="contact-message" className="contact-form-label">Bericht</label>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="contact-form-text-area"
                id="contact-message"
                name="contact-message"
                rows="10"
                maxLength="1000"
                required
                placeholder="Begin hier met het schrijven van jouw bericht...">
            </textarea>

            <Button
                type="submit"
                variant="default"
            >
                Verzenden
            </Button>

            {success && (
                <p className="contact-form-success-message">
                    {success}
                </p>
            )}
        </form>
    );
}

export default ContactForm;