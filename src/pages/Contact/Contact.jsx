import Hero from "../../components/Hero/Hero.jsx";
import contactImg from "../../assets/contactImg.jpg";
import ContentSection from "../../components/ContentSection/ContentSection.jsx";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";
function Contact() {
    return (
        <>
            <Hero
                title={"Contact"}
                text={
                <>
                <p>
                    Is er iets niet duidelijk? Wij staan voor jou klaar!
                </p>
                    <br/>
                <p>
                    Voor de meest gestelde vragen en extra uitleg kan je een bezoekje wagen bij het  <span className="text-highlight">helpcentrum</span>
                </p>

                </>}
                classname={"hero hero--default"}
                imgUrl={contactImg}
                imgAlt={"An image of two foals grooming each other"}
                ellipseClassName={"ellipse ellipse-default"}
            >
                Naar het help-centrum
            </Hero>

            {/*<ContentSection*/}
            {/*title={"Kom je er toch niet uit?"}*/}
            {/*>*/}
            {/*    <p>We helpen je graag verder! Gebruik het contactformulier voor vragen, advies of meer informatie</p>*/}

            {/*    <ContactForm/>*/}

            {/*</ContentSection>*/}
        </>
    );
}

export default Contact;

/*
* TODO:
*  check of buttons verschillende classes kunnen krijgen : solid en bordered*/
