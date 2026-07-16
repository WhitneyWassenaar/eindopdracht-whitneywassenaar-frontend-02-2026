import {createContext, useState,useEffect} from 'react';

const AuthContext = createContext(null);

function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [token,setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    function login(userData,token) {
        setUser(userData);
        setToken(token);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
    }

    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
               login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};