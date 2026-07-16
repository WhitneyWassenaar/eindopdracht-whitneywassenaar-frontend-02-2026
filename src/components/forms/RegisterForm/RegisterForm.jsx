// React
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

// Components
import Button from '../../ui/Button/Button.jsx';

// Api
import api from "../../../api/axios.js";

// CSS
import './RegisterForm.css';
import userNavbar from "../../navigation/UserNavbar/UserNavbar.jsx";


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
            const response = await api.post("/users",
                {
                    email: cleanEmail,
                    password,
                    roles: ["user"]
                }
            );

            const userData = response.data;
            console.log("New user:", userData.id);

            const profileResponse = await api.post("/userProfiles",
                {
                    userId: userData.id,
                    firstName: cleanFirstName,
                    lastName: cleanLastName,
                    stableName: cleanStableName
                }
            );

            localStorage.setItem("userId", userData.id);

            console.log("New profile:", profileResponse.data);

            navigate("/inloggen");

        } catch (error) {
            setError(error.response?.data?.error || "Er is iets mis gegaan...");
        }
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
                minLength="2"
                maxLength="20"
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
                minLength="2"
                maxLength="20"
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
                minLength="5"
                maxLength="30"
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
                maxLength="25"
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
            >
                Registreren
            </Button>
        </form>
    );
}

export default RegisterForm;