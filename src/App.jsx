import {Routes, Route} from 'react-router-dom';

// Pages weblayout
import Home from './pages/weblayout/Home/Home.jsx';
import Functies from './pages/weblayout/Functies/Functies.jsx';
import Contact from './pages/weblayout/Contact/Contact.jsx';
import Inloggen from './pages/weblayout/Inloggen/Inloggen.jsx';
import Registreren from './pages/weblayout/Registreren/Registreren.jsx';
import Helpcentrum from './pages/weblayout/Helpcentrum/Helpcentrum.jsx';
import Error from './pages/weblayout/Error/Error.jsx';

// Pages dashboardlayout
import Dashboard from './pages/dashboardlayout/Dashboard/Dashboard.jsx';
import Paardenbeheer from './pages/dashboardlayout/Paardenbeheer/Paardenbeheer.jsx';
import Stalbezetting from './pages/dashboardlayout/Stalbezetting/Stalbezetting.jsx';
import Zorgtaken from './pages/dashboardlayout/Zorgtaken/Zorgtaken.jsx';
import Contacten from './pages/dashboardlayout/Contacten/Contacten.jsx';

// Components
import WebLayout from './components/layout/WebLayout/WebLayout.jsx';
import DashboardLayout from './components/layout/DashboardLayout/DashboardLayout.jsx';
import ProtectedRoute from './components/authentication/routing/ProtectedRoute.jsx';

import './App.css';

function App() {

    return (
        <>
            <Routes>

                <Route element={<WebLayout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/functies" element={<Functies/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/error" element={<Error/>}/>
                    <Route path="/inloggen" element={<Inloggen/>}/>
                    <Route path="/registreren" element={<Registreren/>}/>
                    <Route path="/helpcentrum" element={<Helpcentrum/>}/>
                </Route>

                <Route element={
                    <ProtectedRoute>
                        <DashboardLayout/>
                    </ProtectedRoute>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/paardenbeheer" element={<Paardenbeheer/>}/>
                    <Route path="/stalbezetting" element={<Stalbezetting/>}/>
                    <Route path="/zorgtaken" element={<Zorgtaken/>}/>
                    <Route path="/contacten" element={<Contacten/>}/>
                </Route>

            </Routes>
        </>
    );
}

export default App