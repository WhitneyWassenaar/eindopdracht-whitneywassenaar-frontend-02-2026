import "./RegisterForm.css"
import Button from "../Button/Button.jsx";
function RegisterForm() {
    return (
        <form className="register-form">
            <label>Voornaam</label>
            <input
                className="input"
                type="text"
                id="first-name"
                name="first-name"
                required
                size="30"
            />

            <label>Achternaam</label>
            <input
                className="input"
                type="text"
                id="last-name"
                name="last-name"
                required
                size="30"
            />

            <label>Stalnaam</label>
            <input
                className="input"
                type="text"
                id="stable-name"
                name="stable-name"
                required
                size="30"
            />

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

            <label>Herhaal wachtwoord</label>
            <input
                className="input"
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
                size="30"
            />

            <label>
                <input type="checkbox" required/>
                Ik ga akkoord met de voorwaarden
            </label>


            <Button
                type={"submit"}
                variant={"default"}
                onClick={"/"}
            >
                Registreren
            </Button>
        </form>
    )
}

export default RegisterForm;

// TODO: usestate, onsubmit, loadstate