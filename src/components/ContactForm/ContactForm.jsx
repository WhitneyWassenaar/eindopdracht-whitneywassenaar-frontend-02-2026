import Button from "../Button/Button.jsx";

function ContactForm() {
    return (
        <form>
            <label>Naam</label>
            <input
                type="text"
                id="name"
                name="name"
                required
                minLength="2"
                maxLength="12"
                size="12"
            />
            <label>E-mail</label>
            <input
                type="text"
                id="e-mail"
                name="e-mail"
                required
                size="30"
            />
            <label>Bericht</label>
            <textarea
            id="contact-message"
            name="contact-message"
            rows="10"
            cols="50"
            placeholder="Begin hier met het typen va uew bericht..."></textarea>

            <Button
                className={"/"}
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