import Hero from "../../components/Hero/Hero.jsx";
import greyHorse from "../../assets/functies/greyHorse.png";
import FeatureCard from "../../components/FeatureCard/FeatureCard.jsx";
import featureImg1 from "../../assets/functies/featureImg1.jpg";
import "./Functies.css"

function Functies() {
    return (
        <>
            <section className="hero-wrapper">
            <section className="hero-section">
                <Hero
                    title={"Voorop in galop,\n dankzij slimme functies!"}
                    text={"Ontdek functies die jouw workflow versnellen."}
                    imgUrl={greyHorse}
                    imgAlt={"An image of a grey horse galopping towards the user's view"}
                    imageVariant={"functies"}
                    variant={"reverse"}
                    ellipseVariant={"functies"}
                />

            </section>
            <svg className="hero-curve-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <g transform="scale(-1,1) translate(-1440,0)"><path fill="var(--secondary-color)" fill-opacity="1" d="M0,32L120,74.7C240,117,480,203,720,250.7C960,299,1200,309,1320,314.7L1440,320L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></g></svg>
            </section>

            <section className="feature-section">
                <div className="feature-section-wrapper">
                    <FeatureCard
                        title={"Paardenbeheer"}
                        articleClassName={"feature-card--default"}
                        imgUrl={featureImg1}
                        imgAlt={"An image of a chestnut horse looking out the stable"}
                        variant={"default"}
                    >
                        <div className="feature-list--default">
                            <ul>
                                <li>Maak paardenprofielen aan</li>
                                <li>Koppel paarden met contactpersonen</li>
                                <li>Voeg medische gegevens toe in het paardenprofiel</li>
                                <li>Zet paarden op actief of inactief</li>
                            </ul>
                        </div>

                    </FeatureCard>

                    <FeatureCard
                        title={"Gezondheidsdossier"}
                        articleClassName={"feature-card--reverse"}
                        imgUrl={featureImg1}
                        imgAlt={"An image of a chestnut horse looking out the stable"}
                        variant={"reverse"}>
                        <div className="feature-list--reverse">
                            <ul>
                                <li>Registreer (aankomende) behandelingen</li>
                                <li>Dierenartsverslagen bewaren</li>
                                <li>Vaccinaties bijhouden</li>
                                <li>Registreer voeding en supplementen</li>
                            </ul>
                        </div>
                    </FeatureCard>

                    <FeatureCard
                        title={"Zorgtaken"}
                        articleClassName={"feature-card--default"}
                        imgUrl={featureImg1}
                        imgAlt={"An image of a chestnut horse looking out the stable"}
                        variant={"default"}>
                        <div className="feature-list--default">
                            <ul>
                                <li>Overzicht van de dagelijkse verzorging</li>
                                <li>Eenvoudig af te vinken</li>
                                <li>Wijs zorgtaken aan een specifiek paard toe</li>
                                <li>Maak zelf zorgtaken aan</li>
                                <li>Wijzig op ieder moment</li>
                            </ul>
                        </div>
                    </FeatureCard>

                    <FeatureCard
                        title={"Planning en afspraken"}
                        articleClassName={"feature-card--reverse"}
                        imgUrl={featureImg1}
                        imgAlt={"An image of a chestnut horse looking out the stable"}
                        variant={"reverse"}>
                        <div className="feature-list--reverse">
                            <ul>
                                <li>Maak slimme keuzes op basis van de statistieken in het dashboard</li>
                                <li>Mis nooit de belangrijkste taken en afspraken</li>
                                <li>Inzicht in stalbezetting en weideplekken</li>
                            </ul>
                        </div>
                    </FeatureCard>

                    <FeatureCard
                        title={"Contactpersonen"}
                        articleClassName={"feature-card--default"}
                        imgUrl={featureImg1}
                        imgAlt={"An image of a chestnut horse looking out the stable"}
                        variant={"default"}
                    >
                        <div className="feature-list--default">
                            <ul>
                                <li>Meerdere contactpersonen koppelen aan één paard</li>
                                <li>Inzicht in rollen of relaties</li>
                                <li>Bewerk detailpagina van elk contactpersoon</li>
                            </ul>
                        </div>
                    </FeatureCard>

                    <FeatureCard
                        title={"Overzicht & filters"}
                        articleClassName={"feature-card--reverse"}
                        imgUrl={featureImg1}
                        imgAlt={"An image of a chestnut horse looking out the stable"}
                        variant={"reverse"}>
                        <div className="feature-list--default">
                            <ul>
                                <li>Filter bij contactpersonen op rol (verzorger, dierenarts, hoefsmid etc.)</li>
                                <li>Zoek op naam van paarden of contactpersonen</li>
                                <li>Sorteer paarden op status, naam, ras, locatie etc.</li>
                            </ul>
                        </div>
                    </FeatureCard>
                    {/*<svg className="curve-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">*/}
                    {/*    <g transform="scale(-1,1) translate(-1440,0)"><path fill="var(--background-color)" fill-opacity="1" d="M0,32L120,74.7C240,117,480,203,720,250.7C960,299,1200,309,1320,314.7L1440,320L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></g></svg>*/}

                </div>


            </section>


        </>
    );
}

export default Functies;

/*
* TODO:
*  curve-bottom fixen in css*/