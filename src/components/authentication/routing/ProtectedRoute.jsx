import {useContext} from 'react';
import {Navigate} from 'react-router-dom';

import {AuthContext} from '../context/AuthContext.jsx';

function ProtectedRoute({children}) {
    const {user, loading} = useContext(AuthContext);

    console.log("ProtectedRoute user:", user);
    console.log("ProtectedRoute loading:", loading);

    if (loading) {
        return <p>Bezig met laden...</p>;
    }

    if (!user) {
        return <Navigate to="/inloggen"/>;
    }

    return children;
}

export default ProtectedRoute;