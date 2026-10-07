// Components
import LoginForm from '../../../components/forms/LoginForm/LoginForm.jsx';

// CSS
import './Inloggen.css';

function Inloggen() {
    return(
        <section className="login-page">
            <h1>Inloggen</h1>
            <LoginForm />
        </section>
    );
}

export default Inloggen;