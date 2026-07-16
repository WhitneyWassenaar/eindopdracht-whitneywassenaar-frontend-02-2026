// Components
import FeatureEllipse from '../FeatureElipse/FeatureEllipse.jsx';

// CSS
import './FeatureCard.css';

function FeatureCard({
                         articleClassName,
                         title,
                         children,
                         imgUrl,
                         imgAlt,
                     variant="default"}) {
    return (
        <div className={`feature-card-wrapper--${variant}`}>
            <article className={articleClassName}>
                <div className="feature-content-wrapper">
                    <h2>{title}</h2>
                    {children}
                </div>
            </article>
            <FeatureEllipse
                imgUrl={imgUrl}
                imgAlt={imgAlt}/>
        </div>

    );
}

export default FeatureCard;