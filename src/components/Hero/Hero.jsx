import "./Hero.css";
import Button from "../Button/Button.jsx";
import ImageWithEllipse from "../ImageWithEllipse/ImageWithEllipse.jsx";

function Hero({title,text,className,buttonClassName,onClick,children,imgUrl,imgAlt, ellipseClassName}) {
    return (
        <section className={className}>
            <article>
                <h1>{title}</h1>
                <p>{text}</p>
                {children && (
                    <Button
                        className={buttonClassName}
                        onClick={onClick}
                    >
                        {children}
                    </Button>
                )}
            </article>

            <ImageWithEllipse
                imgUrl={imgUrl}
                imgAlt={imgAlt}
            className={ellipseClassName}/>
        </section>
    );
}

export default Hero;

/*
* TODO:
*  - Class maken voor:
*  - section
*   - ImageWithEllipse links en rechts
*  - Buttons de juiste class geven
*  - onClick koppelen aan buttons
*/