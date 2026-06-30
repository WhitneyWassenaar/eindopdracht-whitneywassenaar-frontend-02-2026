import "./FeatureCard.css";
import ImageWithEllipse from "../ImageWithEllipse/ImageWithEllipse.jsx";

function FeatureCard({articleClassName,title,children,imgUrl,imgAlt,ellipseClassName}) {
    return (
        <article className={articleClassName}>
            <h2>{title}</h2>
            {children}

            <ImageWithEllipse
            imgUrl={imgUrl}
            imgAlt={imgAlt}
            className={ellipseClassName}/>
        </article>
    );
}

export default FeatureCard;