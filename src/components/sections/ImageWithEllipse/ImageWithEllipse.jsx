// CSS
import './ImageWithEllipse.css';

function ImageWithEllipse({
                              imgUrl,
                              imgAlt,
                              ellipseVariant = "default",
                              imageVariant = "default"
                          }) {
    return (
        <div className="ellipse-wrapper">
            <div className="image-wrapper">
                <img
                    className={`ellipse-img ellipse-img--${imageVariant}`}
                    src={imgUrl}
                    alt={imgAlt}/>
                <div className={`ellipse ellipse--${ellipseVariant}`}></div>
            </div>
        </div>
    );
}

export default ImageWithEllipse;