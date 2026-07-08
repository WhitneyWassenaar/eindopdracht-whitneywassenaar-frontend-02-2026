//Components
import Hero from "../../components/Hero/Hero.jsx";
import ContentSection from "../../components/ContentSection/ContentSection.jsx";
import ReviewSection from "../../components/ReviewSection/ReviewSection.jsx";
//Images
import laptopAndPhone from "../../assets/home/laptopAndPhone.png";
import walkingGirlAndHorse from "../../assets/home/walkingGirlAndHorse.png";
import greyHorseAndRider from "../../assets/home/greyHorseAndRider.png";
import Navbar from "../../components/Navbar/Navbar.jsx";

function Home() {
    return (
        <>
            <Navbar/>
            <Hero
                title={"Beheer jouw paarden,\n behoud het overzicht"}
                text={"Beheer gezondheid, trainingen, voeding, documenten en planning van al je paarden vanuit één centraal systeem."}
                imgUrl={greyHorseAndRider}
                imgAlt={"An image of a rider that takes a jump with her grey horse"}
                buttonVariant={"hero"}
                buttonPath={"/registreren"}

            >
                Probeer het gratis
            </Hero>

            <ContentSection
                title={"Wat is EquiManager?"}
                variant={"default"}
                imgUrl={laptopAndPhone}
                imgAlt={"An image of two foals grooming each other."}
                ellipseVariant={"wat-is-equimanager"}
                imageVariant={"wat-is-equimanager"}
            >
                <div className="contentsection-child--wat-is-equimanager">
                    <p>
                        EquiManager is een applicatie die stalhouders helpt om zorgtaken, gezondheidsinformatie en
                        planningen centraal te beheren, waardoor gegevens actueel en georganiseerd blijven.
                    </p>
                    <p>
                        Met deze applicatie wordt het eenvoudiger om het welzijn van paarden te monitoren, taken te
                        organiseren en samen te werken met verzorgers, dierenartsen en hoefsmeden.
                    </p>
                    <p>
                        Hierdoor krijg jij als stalhouder meer overzicht en wordt de kans op het maken van fouten
                        verminderd en kunnen de dagelijkse werkzaamheden efficiënter worden uitgevoerd.
                    </p>
                </div>
            </ContentSection>

            <ContentSection
                title={"Waarom EquiManager bij jou past!"}
                variant={"reverse"}
                styleVariant={"waarom-equimanager"}
                imgUrl={walkingGirlAndHorse}
                imgAlt={"An image of a girl walking with her bay horse"}
                ellipseVariant={"waarom-equimanager"}
                imageVariant={"waarom-equimanager"}
            >
                <div className="contentsection-child--waarom-equimanager">
                    <div className="waarom-equimanager--highlight">
                        <h3>Complete paardendossiers</h3>
                        <p>Alle informatie van je paarden centraal op één plek! Van medische gegevens en vaccinaties tot
                            voeding en foto’s.</p>
                    </div>
                    <div className="waarom-equimanager--highlight">
                        <h3>Slimme zorgplanning</h3>
                        <p>Plan afspraken, behandelingen en dagelijkse zorgtaken in. Ontvang tijdig herinneringen zodat
                            niets wordt vergeten.</p>
                    </div>
                    <div className="waarom-equimanager--highlight">
                        <h3>Samenwerken met betrokkenen</h3>
                        <p>Koppel eigenaren, trainers, dierenartsen en hoefsmeden aan je paarden.</p>
                    </div>
                    <div className="waarom-equimanager--highlight">
                        <h3>Gericht op overzicht</h3>
                        <p>Bekijk de belangrijkste gegevens , urgente taken en de status van je paarden in één
                            overzicht. Zo
                            behoud je controle over de gezondheid van de paarden en verzorging van je stal.</p>
                    </div>
                </div>
            </ContentSection>

            <ReviewSection/>
        </>
    );
}

export default Home;

/*
* TODO:
*  - isLoggedIn state aanmaken
*  - handleClick voor tijdelijk console.log
*/
