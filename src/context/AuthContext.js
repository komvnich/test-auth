import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '@/config/firebase.config'

export const UserContext = createContext({});

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                setUser(user || null);
                setLoading(false);
            }),

        [],
    );

    const contextValue = useMemo(() => {
        return { user, loading, error };
    }, [error, loading, user]);
    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};