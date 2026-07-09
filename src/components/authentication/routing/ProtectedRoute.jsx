import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";

function ProtectedRoute({children}) {
    const {user} = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/inloggen"/>;
    }
    return children
}

export default ProtectedRoute;