import "./RegisterForm.css"
import Button from "../../ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

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

    function onFormSubmit(e) {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("De wachtwoorden komen niet met elkaar overeen");
            return;
        }

        if (password.length < 8) {
            setError("Het wachtwoord moet minimaal 8 tekens bevatten")
            return;
        }

        if (!acceptToc) {
            setError("Je moet akkoord gaan met de voorwaarden om te kunnen registreren")
            return;
        }

        navigate("/inloggen")
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
                <p className="error-message">
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
    )
}

export default RegisterForm;

// TODO: usestate, onsubmit, loadstate