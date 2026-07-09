import Hero from "../../components/sections/Hero/Hero.jsx";
import contactImg from "../../assets/contact/contactImg.jpg";
import ContactForm from "../../components/forms/ContactForm/ContactForm.jsx";
import "./Contact.css"


function Contact() {
    return (
        <>
            <Hero
                title={"Contact"}
                buttonVariant={"bordered"}
                ellipseVariant={"contact"}
                imageVariant={"contact"}
                buttonPath={"/helpcentrum"}
                text={
                    <>
                        <p>
                            Is er iets niet duidelijk? Wij staan voor jou klaar!
                        </p>
                        <p>
                            Voor de meest gestelde vragen en extra uitleg kan je een bezoekje wagen bij het <span
                            className="text-highlight">helpcentrum</span>
                        </p>

                    </>}
                classname={"hero hero--default"}
                imgUrl={contactImg}
                imgAlt={"An image of two foals grooming each other"}

            >
                Naar het help-centrum
            </Hero>

            <section className="contact-section">
                <div className="contact-form-container">
                <ContactForm/>
                </div>
            </section>


        </>
    );
}

export default Contact;

/*
* TODO:
*  check of buttons verschillende classes kunnen krijgen : solid en bordered*/
