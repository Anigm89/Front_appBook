import { createContext, useState, useEffect } from "react";
import { auth } from "../fb.js";


export const AuthContext  = createContext();

export const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState(null);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            setUsuario(user);
            setShowChild(true);
        });
    }, []);

    return (
        <AuthContext.Provider value={{usuario}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;
