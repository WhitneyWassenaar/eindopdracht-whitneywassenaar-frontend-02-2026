// Components
import Hero from '../../../components/sections/Hero/Hero.jsx';
import ContactForm from '../../../components/forms/ContactForm/ContactForm.jsx';

// Assets
import contactImg from '../../../assets/contact/contactImg.jpg';

// CSS
import './Contact.css';

function Contact() {
    return (
        <>
            <section className="contact-hero">
                <Hero
                    title="Contact"
                    buttonVariant="bordered"
                    ellipseVariant="contact"
                    imageVariant="contact"
                    buttonPath="/helpcentrum"
                    text={
                        <>
                            <p>
                                Is er iets niet duidelijk? Wij staan voor jou klaar!
                            </p>
                        </>
                    }
                    imgUrl={contactImg}
                    imgAlt="An image of two foals grooming each other"
                >
                </Hero>
            </section>

            <section className="contact-section">
                <div className="contact-form-container">
                    <ContactForm/>
                </div>
            </section>
        </>
    );
}

export default Contact;