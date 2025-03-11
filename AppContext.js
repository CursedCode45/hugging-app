import { getInfoOnstartUp } from './constant/Helpers';
import * as React from 'react';
import { getUniqueId } from './constant/Helpers';


const AppContext = React.createContext();
export function AppProvider({ children }) {
    const [usesLeft, setUsesLeft] = React.useState(null);
    const [isPremium, setIsPremium] = React.useState(null);
    const [clientId, setClientId] = React.useState(null);

    React.useLayoutEffect(() => {
        async function onStartUp(){
            const idClient = await getUniqueId();
            const [uses, is_premium] = await getInfoOnstartUp(idClient);
            setClientId(idClient);
            setIsPremium(is_premium);
            setUsesLeft(uses);
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