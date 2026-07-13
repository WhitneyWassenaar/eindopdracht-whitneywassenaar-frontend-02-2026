import {Link} from 'react-router-dom';

import errorImg from "../../../assets/error/errorImg.png";

import ContentSection from "../../../components/sections/ContentSection/ContentSection.jsx";

import "./Error.css"

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
                    OEPS... Er is iets mis gegaan... Klik <Link to="/">hier</Link> om terug te gaan naar de homepagina
                </p>
            </ContentSection>
        </>
    );
}

export default Error;