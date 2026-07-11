import './App.css'

import Home from "./pages/weblayout/Home/Home.jsx";
import Functies from "./pages/weblayout/Functies/Functies.jsx";
import Contact from "./pages/weblayout/Contact/Contact.jsx";
import Inloggen from "./pages/weblayout/Inloggen/Inloggen.jsx";
import Registreren from "./pages/weblayout/Registreren/Registreren.jsx";
import Helpcentrum from "./pages/weblayout/Helpcentrum/Helpcentrum.jsx";

import Error from "./pages/weblayout/Error/Error.jsx";
import {Routes, Route} from 'react-router-dom';
import Dashboard from "./pages/dashboardlayout/Dashboard/Dashboard.jsx";
import DashboardLayout from "./components/layout/DashboardLayout/DashboardLayout.jsx";
import WebLayout from "./components/layout/WebLayout/WebLayout.jsx";
import Paardenbeheer from "./pages/dashboardlayout/Paardenbeheer/Paardenbeheer.jsx";
import Stalbezetting from "./pages/dashboardlayout/Stalbezetting/Stalbezetting.jsx";
import Zorgtaken from "./pages/dashboardlayout/Zorgtaken/Zorgtaken.jsx";
import Contacten from "./pages/dashboardlayout/Contacten/Contacten.jsx";
import ProtectedRoute from "./components/authentication/routing/ProtectedRoute.jsx";


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

/*
* TODO:
*  Toevoegen:
*  - help pagina toevoegen bij user nav
*  - AuthContext
*  - Routing
*  - Conditional rendering toepassen bij specifieke pagina's
*   Let op: heb jij jouw interface zo ontworpen dat sommige pagina's géén navigatie of footer hebben en sommige wel? Of ziet de footer er op sommige pagina's anders uit? In dat geval zul je het navigatie- en footer element op iedere pagina afzonderlijk moeten invoegen, in plaats van eenmalig in App.js.
* */