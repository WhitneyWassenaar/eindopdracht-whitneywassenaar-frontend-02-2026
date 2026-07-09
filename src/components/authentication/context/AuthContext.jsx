import {createContext, useState} from "react";

const AuthContext = createContext(null);

function AuthProvider({children}) {

    const [user, setUser] = useState(null);

    function login(userData) {
        setUser(userData);
    }

    function logout(userData) {
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};