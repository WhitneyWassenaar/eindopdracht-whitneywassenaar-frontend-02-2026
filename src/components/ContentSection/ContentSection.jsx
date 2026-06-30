import "./ContentSection.css";
import ImageWithEllipse from "../ImageWithEllipse/ImageWithEllipse.jsx";

function ContentSection({title,children, imgUrl, imgAlt,ellipseClassName}) {
    return (
        <section>
            <div>
                <h2>{title}</h2>
                {children}
            </div>
            <div>
                <ImageWithEllipse
                    className={ellipseClassName}
                imgUrl={imgUrl}
                imgAlt={imgAlt}/>
            </div>
        </section>
    );
}

export default ContentSection;

/*
* TODO:
*  - Class maken voor:
*  - section
*  - ImageWithEllipse
*/