// Components
import Button from '../../ui/Button/Button.jsx';
import ImageWithEllipse from '../ImageWithEllipse/ImageWithEllipse.jsx';

// CSS
import './Hero.css';

function Hero({
                  title,
                  text,
                  children,
                  imgUrl,
                  imgAlt,
                  variant = "default",
                  buttonVariant = "default",
                  imageVariant = "default",
                  ellipseVariant = "default",
                  buttonPath
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
                        buttonPath={buttonPath}
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