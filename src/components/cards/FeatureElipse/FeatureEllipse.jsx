import './FeatureEllipse.css';

function FeatureEllipse({imgUrl,imgAlt}) {
    return (
        <div className="feature-ellipse">
            <img src={imgUrl} alt={imgAlt}/>
        </div>
    );
}

export default FeatureEllipse;