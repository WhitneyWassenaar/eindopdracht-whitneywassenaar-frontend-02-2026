import './App.css'
import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
// import Footer from "./components/Footer/Footer.jsx";
import Functies from "./pages/Functies/Functies.jsx";
import Contact from "./pages/Contact/Contact.jsx";
// import Error from "./pages/Error/Error.jsx";
function App() {

    return (
        <>
            <Navbar/>
            <div className="inner-container">
                <Home/>
                <Functies/>
                <Contact/>
                {/*<Error/>*/}
            </div>
            {/*<Footer/>*/}
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
* */