import "./Error.css"
import errorImg from "../../assets/error/errorImg.png";
import ContentSection from "../../components/ContentSection/ContentSection.jsx";

function Error() {
    return (
        <>
            <ContentSection
                title={"Error"}
                imgUrl={errorImg}
                imgAlt={"An image of two foals grooming each other."}
                ellipseClassName={"ellipse ellipse-default"}
            >
                <p>
                    OEPS... Er is iets mis gegaan...
                </p>
            </ContentSection>
        </>
    );
}

export default Error;

/*
* TODO:
*  - Na een paar seconden doorverwijzen naar homepagina of knop gebruiken of niets
*  - meer instructies op deze pagina?
*/
