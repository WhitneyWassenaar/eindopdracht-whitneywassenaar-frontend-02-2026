import './App.css'

import Home from "./pages/Home/Home.jsx";
import Functies from "./pages/Functies/Functies.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Inloggen from "./pages/Inloggen/Inloggen.jsx";
import Registreren from "./pages/Registreren/Registreren.jsx";

import Footer from "./components/Footer/Footer.jsx";
import Error from "./pages/Error/Error.jsx";

import {Routes, Route} from 'react-router-dom';
import Helpcentrum from "./pages/Helpcentrum/Helpcentrum.jsx";

function App() {

    return (
        <>
            <div className="inner-container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/functies" element={<Functies/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/error" element={<Error/>}/>
                    <Route path="/inloggen" element={<Inloggen/>}/>
                    <Route path="/registreren" element={<Registreren/>}/>
                    <Route path="/helpcentrum" element={<Helpcentrum/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    );
}

export default App

/*
* TODO:
*  Toevoegen:
*  - AuthContext
*  - Routing
*  - Conditional rendering toepassen bij specifieke pagina's
*   Let op: heb jij jouw interface zo ontworpen dat sommige pagina's géén navigatie of footer hebben en sommige wel? Of ziet de footer er op sommige pagina's anders uit? In dat geval zul je het navigatie- en footer element op iedere pagina afzonderlijk moeten invoegen, in plaats van eenmalig in App.js.
* */