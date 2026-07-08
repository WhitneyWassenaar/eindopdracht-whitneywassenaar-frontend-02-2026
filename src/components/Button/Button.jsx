import "./Button.css";
import {useNavigate} from "react-router-dom";

function Button({
                    children,
                    variant = "default",
                    buttonPath,
                    type="button"
                }) {
    const navigate = useNavigate();
    return (
        <button
            type={type}
            className={`button button--${variant}`}
            onClick={() => navigate(buttonPath)}
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