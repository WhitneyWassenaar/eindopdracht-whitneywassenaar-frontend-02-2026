import {useNavigate} from 'react-router-dom';

import './Button.css';

function Button({
                    children,
                    variant = "default",
                    buttonPath,
                    type = "button",
                    onClick,
                    className
                }) {

    const navigate = useNavigate();

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        } else if (buttonPath) {
            navigate(buttonPath);
        }
    };

    return (
        <button
            type={type}
            className={`button button--${variant} ${className} || ""}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}

export default Button;