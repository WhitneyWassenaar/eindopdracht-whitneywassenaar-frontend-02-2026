import "./Hero.css";
import Button from "../Button/Button.jsx";
import ImageWithEllipse from "../ImageWithEllipse/ImageWithEllipse.jsx";
import greyHorseWithRider from "../../assets/greyHorseAndRider.png";

function Hero() {
    return (
        <section>
            <article>
                <h1>Beheer jouw paarden,<br/> behoud het overzicht</h1>
                <p>Beheer gezondheid, trainingen, voeding, documenten en planning van al je paarden vanuit één centraal
                    systeem.</p>
                <Button
                    className={"/"}
                    onClick={"/"}
                >
                    Probeer het gratis
                </Button>
            </article>

            <ImageWithEllipse
                imgUrl={greyHorseWithRider}
                imgAlt={"Jumping grey horse with rider"}/>
        </section>
    );
}

export default Hero;

/*
* TODO:
*  - Class maken voor:
*  - section
*   - ImageWithEllipse links en rechts
*  - Buttons de juiste class geven
*  - onClick koppelen aan buttons
*/