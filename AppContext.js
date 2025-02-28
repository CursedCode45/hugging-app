import { getIsPremium, getCurrentAppUsesLeft } from './constant/Helpers';
import * as React from 'react';



const AppContext = React.createContext();
export function AppProvider({ children }) {
    const [usesLeft, setUsesLeft] = React.useState();
    const [isPremium, setIsPremium] = React.useState();

    React.useLayoutEffect(() => {
        async function onStartUp(){
            setIsPremium(await getIsPremium());
            setUsesLeft(await getCurrentAppUsesLeft());
        }
        onStartUp();
    }, [])

    return (
    <AppContext.Provider value={{ usesLeft, setUsesLeft, isPremium, setIsPremium }}>
        {children}
    </AppContext.Provider>
    );
};

export const useAppContext = () => React.useContext(AppContext);