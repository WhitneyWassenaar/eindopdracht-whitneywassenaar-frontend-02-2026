// React
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

// Components
import App from './App.jsx';

// Context / Hooks
import {AuthProvider} from './components/authentication/context/AuthContext.jsx';

// CSS
import './index.css';

createRoot(document.getElementById('root')).render(
        <AuthProvider>
            <Router>
                <App/>
            </Router>
        </AuthProvider>
);
