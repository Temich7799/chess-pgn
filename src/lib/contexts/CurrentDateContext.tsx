import React, { createContext, useContext, ReactNode } from 'react';

type ContextValue = {
    currentDay: number;
    currentMonthIndex: number;
}

export const CurrentDateContext = createContext<ContextValue | undefined>(undefined);

export const CurrentDateContextProvider: React.FC<{ children: ReactNode, value: ContextValue }> = ({ children, value }) => {
    return <CurrentDateContext.Provider value={value}>{children}</CurrentDateContext.Provider>;
};

export const useCurrentDateContext = () => {
    const context = useContext(CurrentDateContext);
    if (!context) {
        throw new Error('useCurrentDateContext must be used within a CurrentDateContextProvider');
    }
    return context;
};
