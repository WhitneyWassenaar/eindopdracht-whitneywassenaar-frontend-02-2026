import "./Button.css";

function Button({children, className, onClick}) {
    return (
        <button
            className={className}
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