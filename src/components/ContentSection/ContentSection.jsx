import "./ContentSection.css";
import ImageWithEllipse from "../ImageWithEllipse/ImageWithEllipse.jsx";

function ContentSection({
                            title,
                            children,
                            imgUrl,
                            imgAlt,
                            variant = "default",
                            styleVariant = "default",
                            ellipseVariant = "default",
                            imageVariant
                        }) {
    return (
        <section className={`content-section content-section--${variant} content-section--${styleVariant}`}>
            <div className="content-wrapper">
                <h2>{title}</h2>
                {children}
            </div>
            {imgUrl && (
                <ImageWithEllipse
                    ellipseVariant={ellipseVariant}
                    imgUrl={imgUrl}
                    imgAlt={imgAlt}
                    imageVariant={imageVariant}/>
            )}
        </section>
    );
}

export default ContentSection;