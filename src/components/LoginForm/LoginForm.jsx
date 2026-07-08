import "./LoginForm.css"
import Button from "../Button/Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

function LoginForm() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function onFormSubmit(e) {
        e.preventDefault();

        //Dit zijn tijdelijke test gegevens
        if (email === "pietje@live.nl" && password === "123") {
            navigate("/"); //Dit moet later "/dashboard" zijn
        } else {
            setError("Ongeldige email of wachtwoord")
        }
    }

    return (
        <form
            className="login-form"
            onSubmit={onFormSubmit}
        >
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

            <p className="register-text">
                Nog geen account?
                <Link to="/registreren">
                    Registreer!
                </Link>
            </p>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <Button
                type={"submit"}
                variant={"default"}
            >
                Inloggen
            </Button>
        </form>
    )
}

export default LoginForm;

// TODO: usestate, onsubmit, loadstate