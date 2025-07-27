import {IPlayerResults, IPlayers, IResults, ISettingAtTimes, useFirebase} from "@shared/db";
import React, {ReactNode, useContext, useMemo} from "react";
import {calculateAll} from "../utils";

interface DataWrapperProps {
    children: ReactNode;
}

export const DataWrapper = ({children}: DataWrapperProps) => {
    const {players, results, settingsAtTime} = useFirebase();
    const playerResults: IPlayerResults = useMemo(() => calculateAll(results, settingsAtTime), [results, settingsAtTime]);

    return (
        <DataContext.Provider value={{players, playerResults, results, settingsAtTime}}>
            {children}
        </DataContext.Provider>
    );
};

export interface IDataContext {
    players: IPlayers,
    playerResults: IPlayerResults,
    results: IResults,
    settingsAtTime: ISettingAtTimes,
}

export const defaultDataContext: (IDataContext) = {
    players: {},
    playerResults: {},
    results: {},
    settingsAtTime: {}
};
const DataContext = React.createContext(defaultDataContext);
export const useDataContext = () => useContext(DataContext);
