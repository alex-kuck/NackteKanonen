import { useFirebase, v2 } from '@shared/db';
import React, { ReactNode, useContext } from 'react';

interface DataWrapperProps {
    children: ReactNode;
}

export const DataWrapper = ({ children }: DataWrapperProps) => {
    const { players, withdrawals, fees, deposits, meetings } = useFirebase();

    return (
        <DataContext.Provider
            value={{
                players,
                withdrawals,
                fees,
                deposits,
                meetings,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export interface IDataContext {
    players: v2.Players;
    deposits: v2.Deposits;
    fees: v2.Fees;
    meetings: v2.Meetings;
    withdrawals: v2.Withdrawals;
}

export const defaultDataContext: IDataContext = {
    players: {},
    deposits: {},
    fees: {},
    meetings: {},
    withdrawals: {},
};
const DataContext = React.createContext(defaultDataContext);
export const useDataContext = () => useContext(DataContext);
