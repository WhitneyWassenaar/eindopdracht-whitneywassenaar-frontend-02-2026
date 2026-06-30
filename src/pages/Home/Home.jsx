import Hero from "../../components/Hero/Hero.jsx";
import ContentSection from "../../components/ContentSection/ContentSection.jsx";
import foals from "../../assets/foals.png";
import walkingGirlAndHorse from "../../assets/walkingGirlAndHorse.png";
import ReviewSection from "../../components/ReviewSection/ReviewSection.jsx";
import greyHorseAndRider from "../../assets/greyHorseAndRider.png";



function Home() {
    return (
        <>
                <Hero
                title={"Beheer jouw paarden, behoud het overzicht"}
                text={"Beheer gezondheid, trainingen, voeding, documenten en planning van al je paarden vanuit één centraal systeem."}
                classname={"hero hero--default"}
                imgUrl={greyHorseAndRider}
                imgAlt={"An image of a rider that takes a jump with her grey horse"}
                ellipseClassName={"ellipse ellipse-default"}
                >
                    Probeer het gratis
                </Hero>

                <ContentSection
                    title={"Wat is EquiManager?"}
                    imgUrl={foals}
                    imgAlt={"An image of two foals grooming each other."}
                >
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

                </ContentSection>

                <ContentSection
                    title={"Waarom EquiManager bij jou past!"}
                    imgUrl={walkingGirlAndHorse}
                    imgAlt={"An image of a girl walking with her bay horse"}
                    ellipseClassName={"ellipse ellipse-alt"}>
                    <h3>Complete paardendossiers</h3>
                    <p>Alle informatie van je paarden centraal op één plek! Van medische gegevens en vaccinaties tot
                        voeding en foto’s.</p>

                    <h3>Slimme zorgplanning</h3>
                    <p>Plan afspraken, behandelingen en dagelijkse zorgtaken in. Ontvang tijdig herinneringen zodat
                        niets wordt vergeten.</p>

                    <h3>Samenwerken met betrokkenen</h3>
                    <p>Koppel eigenaren, trainers, dierenartsen en hoefsmeden aan je paarden.</p>

                    <h3>Gericht op overzicht</h3>
                    <p>Bekijk de belangrijkste gegevens , urgente taken en de status van je paarden in één overzicht. Zo
                        behoud je controle over de gezondheid van de paarden en verzorging van je stal.</p>
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
