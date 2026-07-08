import "./LoginForm.css"
import Button from "../Button/Button.jsx";
function LoginForm() {
    return (
        <form className="login-form">
            <label>E-mail</label>
            <input
                className="input"
                type="text"
                id="e-mail"
                name="e-mail"
                required
                size="30"
            />

            <label>Wachtwoord</label>
            <input
                className="input"
                type="password"
                id="password"
                name="password"
                required
                size="30"
            />

            <p className="register-text">
                Nog geen account?
                {/*<Link to="/registreren">*/}
                {/*    Registreren*/}
                {/*</Link>*/}
            </p>


            <Button
            type={"submit"}
            variant={"default"}
            onClick={"/"}
            >
                Inloggen
            </Button>
        </form>
    )
}

export default LoginForm;

// TODO: usestate, onsubmit, loadstate