// React
import {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';

// Components
import Button from '../../ui/Button/Button.jsx';

// Context / Hooks
import {AuthContext} from '../../authentication/context/AuthContext.jsx';

// Data
import projectId from '../../../data/projectId.js';

// CSS
import './LoginForm.css'

function LoginForm() {
    const navigate = useNavigate();

    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function onFormSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch("https://novi-backend-api-wgsgz.ondigitalocean.app/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "novi-education-project-id": projectId,
                    },
                    body: JSON.stringify({email, password})
                });
            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            login(
                data.user,
                data.token
            );
            navigate("/dashboard");

        } catch (error) {
            setError(error.message);
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