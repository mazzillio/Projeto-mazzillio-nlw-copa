import { createContext, ReactNode } from 'react';
interface UserProps {
    name:string;
    avatarUrl: string;
}
export interface AuthContextDataProps {
    user:UserProps;
    signIn:() =>Promise<void>;
}
interface AuthProviderProps{
    children: ReactNode;
}
const AuthContext = createContext({} as AuthContextDataProps);

function AuthContextProvider({ children }:AuthProviderProps) {
    async function signIn() {

    }
    return(
        <AuthContext.Provider value={{
            signIn,
            user:{
                name:'mazzillio',
                avatarUrl:'https://github.com/mazzillio.png'
            }
        }}>
        {children}    
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider}