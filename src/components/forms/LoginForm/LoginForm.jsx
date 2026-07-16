// React
import {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';

// Components
import Button from '../../ui/Button/Button.jsx';

// Context / Hooks
import {AuthContext} from '../../authentication/context/AuthContext.jsx';

// Api
import api from "../../../api/axios.js";

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
        setError("");
        try {
            const response = await api.post("/login",
                {
                    email,
                    password
                });

            const data = response.data;

            login(
                data.user,
                data.token
            );
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            setError(error.response?.data?.error || "Er is iets mis gegaan..")
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