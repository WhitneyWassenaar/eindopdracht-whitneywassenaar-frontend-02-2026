import "./ImageWithEllipse.css";

function ImageWithEllipse({imgUrl,imgAlt,className}) {
    return (
        <div>
            <img className={"/"} src={imgUrl} alt={imgAlt} />
            <div className={className}></div>
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