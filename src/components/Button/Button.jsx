import "./Button.css";

function Button({
                    children,
                    variant="default",
                    onClick,
                    type}) {
    return (
        <button
            type={type}
            className={`button button--${variant}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;

/*
* TODO:
*  - onClick functie aanmaken
*  - Class maken voor:
*  - Button
*   - solid
*   - bordered
*/