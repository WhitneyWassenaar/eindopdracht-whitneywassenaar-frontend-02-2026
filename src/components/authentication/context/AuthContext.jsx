import {createContext, useState} from 'react';

const AuthContext = createContext(null);

function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [token,setToken] = useState(null);

    function login(userData,token) {
        setUser(userData);
        setToken(token);
    }

    function logout() {
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                token,
                setToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};