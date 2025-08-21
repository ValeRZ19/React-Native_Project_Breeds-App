import { Users } from "@/data/users";
import { AuthContextType, User } from "@/interfaces/context.interface";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = ():AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) throw new Error ('The authentication context cannot be accessed outside the provider')
    return context;
}

export const AuthProvider = ({children}:PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const login = async(username:string, password:string):Promise<boolean> =>{
        setLoading(true);
        const foundUser = Users.find(u => u.userName === username && u.password === password);

        if(foundUser){
            setUser({id:foundUser.id, userName:foundUser.userName});
            setLoading(false);
            return true;
        }
        setLoading(false);
        return false;
    }

    const logout = () =>{
        setUser(null);
        router.replace('/login');
    }

    return(
        <AuthContext.Provider value={{
            //properties
            user,
            loading,
            //Methods
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}