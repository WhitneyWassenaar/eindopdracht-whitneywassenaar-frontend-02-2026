// React
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

// Components
import Button from '../../ui/Button/Button.jsx';

// CSS
import './RegisterForm.css';
import projectId from "../../../data/projectId.js";

function RegisterForm() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [stableName, setStableName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptToc, setAcceptToc] = useState(false)
    const [error, setError] = useState("");

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
            setError("Het wachtwoord moet minimaal 8 tekens bevatten")
            return;
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[@#!$%^&*()_\-+=]).{8,}$/;

        if (!passwordRegex.test(password)) {
            setError(
                "Het wachtwoord moet minimaal 8 tekens bevatten, 1 hoofdletter en 1 speciaal teken"
            );
            return;
        }

        if (!acceptToc) {
            setError("Je moet akkoord gaan met de voorwaarden om te kunnen registreren")
            return;
        }

        try {
            const response = await fetch(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "novi-education-project-id": projectId,
                    },
                    body: JSON.stringify({
                        firstname:cleanFirstName,
                        lastName:cleanLastName,
                        stableName:cleanStableName,
                        email: cleanEmail,
                        password,
                        roles: ["user"]
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Registreren mislukt");
                return;
            }

            navigate("/inloggen")
        } catch (error) {
            setError(error.message);
        }

        const response = await fetch(
            "https://novi-backend-api-wgsgz.ondigitalocean.app/api/users",
            {
                method: "GET",
                headers: {
                    "novi-education-project-id": projectId,
                },
            }
        );

        const data = await response.json();

        console.log(data);

    }

    return (
        <form
            className="register-form"
            onSubmit={onFormSubmit}
        >
            <label>Voornaam</label>
            <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
                type="text"
                id="first-name"
                name="first-name"
                required
                size="30"
            />

            <label>Achternaam</label>
            <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
                type="text"
                id="last-name"
                name="last-name"
                required
                size="30"
            />

            <label>Stalnaam</label>
            <input
                value={stableName}
                onChange={(e) => setStableName(e.target.value)}
                className="input"
                type="text"
                id="stable-name"
                name="stable-name"
                required
                size="30"
            />

            <label>E-mail</label>
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

            <label>Wachtwoord</label>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                type="password"
                id="password"
                name="password"
                required
                size="30"
            />

            <label>Herhaal wachtwoord</label>
            <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
                size="30"
            />

            <label>
                <input
                    checked={acceptToc}
                    onChange={(e) => setAcceptToc(e.target.checked)}
                    type="checkbox"
                    required/>
                Ik ga akkoord met de voorwaarden
            </label>

            {error && (
                <p className="error-message"
                >
                    {error}
                </p>
            )}

            <Button
                type={"submit"}
                variant={"default"}
            >
                Registreren
            </Button>
        </form>
    );
}

export default RegisterForm;