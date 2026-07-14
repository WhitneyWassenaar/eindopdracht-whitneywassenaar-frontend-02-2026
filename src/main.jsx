
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import {AuthProvider} from './components/authentication/context/AuthContext.jsx';
import App from './App.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(

        <AuthProvider>
            <Router>
                <App/>
            </Router>
        </AuthProvider>

);
