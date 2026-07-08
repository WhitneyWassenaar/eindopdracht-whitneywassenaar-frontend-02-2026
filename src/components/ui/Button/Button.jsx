import "./Button.css";
import {useNavigate} from "react-router-dom";

function Button({
                    children,
                    variant = "default",
                    buttonPath,
                    type = "button",
                    onClick
                }) {

    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (buttonPath) {
            navigate(buttonPath);
        }
    };

    return (
        <button
            type={type}
            className={`button button--${variant}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}

export default Button;