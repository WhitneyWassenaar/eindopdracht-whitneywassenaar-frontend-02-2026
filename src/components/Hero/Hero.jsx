import "./Hero.css";
import Button from "../Button/Button.jsx";
import ImageWithEllipse from "../ImageWithEllipse/ImageWithEllipse.jsx";

function Hero({
                  title,
                  text,
                  onClick,
                  children,
                  imgUrl,
                  imgAlt,
                  variant = "default",
                  buttonVariant = "default",
                  imageVariant = "default",
                  ellipseVariant = "default"
              }
) {
    return (
        <section className={`hero hero--${variant}`}>
            <article className="hero-article-wrapper">
                <div className="hero-article-content-wrapper">
                    <h1>{title}</h1>
                    <div>{text}</div>

                </div>
                {children && (
                    <Button
                        variant={buttonVariant}
                        onClick={onClick}
                    >
                        {children}
                    </Button>
                )}
            </article>

            <ImageWithEllipse
                imgUrl={imgUrl}
                imgAlt={imgAlt}
                imageVariant={imageVariant}
                ellipseVariant={ellipseVariant}
            />
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