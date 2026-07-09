import './App.css'

import Home from "./pages/Home/Home.jsx";
import Functies from "./pages/Functies/Functies.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Inloggen from "./pages/Inloggen/Inloggen.jsx";
import Registreren from "./pages/Registreren/Registreren.jsx";
import Helpcentrum from "./pages/Helpcentrum/Helpcentrum.jsx";

import Error from "./pages/Error/Error.jsx";
import {Routes, Route} from 'react-router-dom';
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import DashboardLayout from "./components/layout/DashboardLayout/DashboardLayout.jsx";
import WebLayout from "./components/layout/WebLayout/WebLayout.jsx";
import Paardenbeheer from "./pages/Paardenbeheer/Paardenbeheer.jsx";
import Stalbezetting from "./pages/Stalbezetting/Stalbezetting.jsx";
import Zorgtaken from "./pages/Zorgtaken/Zorgtaken.jsx";
import Contacten from "./pages/Contacten/Contacten.jsx";
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
                    {/*<Route path="/dashboard" element={<Dashboard/>}/>*/}
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