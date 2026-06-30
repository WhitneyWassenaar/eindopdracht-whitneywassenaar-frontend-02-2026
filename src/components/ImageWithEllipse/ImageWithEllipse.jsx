import "./ImageWithEllipse.css";

function ImageWithEllipse({
                              imgUrl,
                              imgAlt,
                              ellipseVariant="default",
    imageVariant="default"
}) {
    return (
        <div className="ellipse-wrapper">
            <div className="image-wrapper">
                <img className={`ellipse-img-default ellipse-img--${imageVariant}`} src={imgUrl} alt={imgAlt} />
            </div>

            <div className={`ellipse ellipse--${ellipseVariant}`}></div>
        </div>
    );
}

export default ImageWithEllipse;

/*
* TODO:
*  - Class maken voor:
*  - img
*  - ellipse
*/