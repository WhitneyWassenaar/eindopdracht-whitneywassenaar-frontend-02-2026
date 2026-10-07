// React
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

// Components
import Button from '../../ui/Button/Button.jsx';

// Api
import api from "../../../api/axios.js";

// CSS
import './RegisterForm.css';

function RegisterForm() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [stableName, setStableName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptToc, setAcceptToc] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function onFormSubmit(e) {
        e.preventDefault();
        setError("");

        const cleanEmail = email.toLowerCase().trim();
        const cleanFirstName = firstName.trim();
        const cleanLastName = lastName.trim();
        const cleanStableName = stableName.trim();

        if (password !== confirmPassword) {
            setError("De wachtwoorden komen niet met elkaar overeen");
            return;
        }

        if (password.length < 8) {
            setError("Het wachtwoord moet minimaal 8 tekens bevatten");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setError("Het wachtwoord moet minimaal 1 hoofdletter bevatten");
            return;
        }

        if (!/[@#!$%^&*()_\-+=]/.test(password)) {
            setError("Het wachtwoord moet minimaal 1 speciaal teken bevatten");
            return;
        }

        if (!acceptToc) {
            setError("Je moet akkoord gaan met de voorwaarden om te kunnen registreren")
            return;
        }

        try {
            const response = await api.post("/users",
                {
                    email: cleanEmail,
                    password,
                    roles: ["user"]
                }
            );

            const userData = response.data;

            await api.post("/userProfiles",
                {
                    userId: userData.id,
                    firstName: cleanFirstName,
                    lastName: cleanLastName,
                    stableName: cleanStableName
                }
            );

            localStorage.setItem("userId", userData.id);

            setSuccess("Account succesvol aangemaakt! Je wordt doorgestuurd naar de inlogpagina.");

            setTimeout(() => {
                navigate("/inloggen");
            }, 5000);

        } catch (error) {
            setError(error.response?.data?.error || "Er is iets mis gegaan...");
        }
    }

    return (
                <form
                    className="register-form"
                    onSubmit={onFormSubmit}
                >
                    <label
                        htmlFor="first-name"
                        className="register-form-label"
                    >
                        Voornaam
                    </label>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="register-form-input"
                        type="text"
                        id="first-name"
                        name="first-name"
                        required
                        minLength="2"
                        maxLength="50"
                    />

                    <label
                        htmlFor="last-name"
                        className="register-form-label"
                    >
                        Achternaam
                    </label>
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="register-form-input"
                        type="text"
                        id="last-name"
                        name="last-name"
                        required
                        minLength="2"
                        maxLength="50"
                    />

                    <label
                        htmlFor="stable-name"
                        className="register-form-label"
                    >
                        Stalnaam
                    </label>
                    <input
                        value={stableName}
                        onChange={(e) => setStableName(e.target.value)}
                        className="register-form-input"
                        type="text"
                        id="stable-name"
                        name="stable-name"
                        required
                        minLength="5"
                        maxLength="50"
                    />

                    <label
                        htmlFor="e-mail"
                        className="register-form-label"
                    >
                        E-mail
                    </label>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-form-input"
                        type="email"
                        id="e-mail"
                        name="e-mail"
                        required
                        maxLength="50"
                    />

                    <label
                        htmlFor="password"
                        className="register-form-label"
                    >
                        Wachtwoord
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-form-input"
                        type="password"
                        id="password"
                        name="password"
                        required
                    />

                    <label
                        htmlFor="confirm-password"
                        className="register-form-label"
                    >
                        Herhaal wachtwoord
                    </label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="register-form-input"
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        required
                    />

                    <div className="register-form-checkbox">
                        <input
                            id="accept-tos"
                            checked={acceptToc}
                            onChange={(e) => setAcceptToc(e.target.checked)}
                            type="checkbox"
                            required
                        />
                        <label
                            htmlFor="accept-tos"
                        >
                            Ik ga akkoord met de voorwaarden
                        </label>
                    </div>

                    {error && (
                        <p className="register-form-error-message"
                        >
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="register-form-success-message">
                            {success}
                        </p>
                    )}

                    <Button
                        type={"submit"}
                    >
                        Registreren
                    </Button>
                </form>
    );
}

export default RegisterForm;