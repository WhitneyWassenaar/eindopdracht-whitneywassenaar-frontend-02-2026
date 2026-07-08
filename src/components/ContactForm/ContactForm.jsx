import Button from "../Button/Button.jsx";
import "./ContactForm.css"
function ContactForm() {
    return (

            <form className="contact-form">
                <label className="label">Naam</label>
                <input
                    className="input"
                    type="text"
                    id="name"
                    name="name"
                    required
                    minLength="2"
                    maxLength="12"
                    size="12"
                />
                <label className="label">E-mail</label>
                <input
                    className="input"
                    type="text"
                    id="e-mail"
                    name="e-mail"
                    required
                    size="30"
                />
                <label className="label">Bericht</label>
                <textarea
                    className="text-area"
                    id="contact-message"
                    name="contact-message"
                    rows="10"
                    required
                    placeholder="Begin hier met het typen va uw bericht..."></textarea>

                <Button
                    className={"default"}
                    onClick={"/"}
                    type={"submit"}
                >Verzenden</Button>

            </form>


    )
}

export default ContactForm;

/*
* TODO:
*  - onSubmit
*  - states voor elke input
*  - preventDefault
* */