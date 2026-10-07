// React
import {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';

// Components
import Button from '../../ui/Button/Button.jsx';

// Context / Hooks
import {AuthContext} from '../../../context/AuthContext.jsx';

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

            const loginData = response.data;
            console.log("Logged in user:", loginData);

            const userResponse = await api.get("/users",
                {
                    headers: {
                        Authorization: `Bearer ${loginData.token}`
                    }
                });

            const user = userResponse.data.find(user => user.email === loginData.user.email)

            const userId = user.id;

            const profileResponse = await api.get(`/users/${userId}/userProfiles`,
                {
                    headers: {
                        Authorization: `Bearer ${loginData.token}`
                    }
                });
            const profile = profileResponse.data[0];

            console.log("Profiel:", profile);
            console.log("Login response:", response.data);
            console.log("User:", response.data.user);
            console.log("Profiel:", profile);
            login(
                {
                    ...loginData.user,
                    id: profile.userId,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    stableName: profile.stableName
                },
                loginData.token
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
            <label
                htmlFor="e-mail"
            >
                E-mail
            </label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-form-input"
                type="email"
                id="e-mail"
                name="e-mail"
                required
            />

            <label
                htmlFor="password"
                className="login-form-label"
            >
                Wachtwoord
            </label>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-form-input"
                type="password"
                id="password"
                name="password"
                required
            />

            <p className="login-form-register-text">
                Nog geen account?
                <Link to="/registreren">
                    Registreer!
                </Link>
            </p>

            {error && (
                <p className="login-form-error-message">
                    {error}
                </p>
            )}

            <Button
                type="submit"
                variant="default"
            >
                Inloggen
            </Button>
        </form>
    )
}

export default LoginForm;