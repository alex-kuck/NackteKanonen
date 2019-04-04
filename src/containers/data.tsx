import React, {useMemo} from "react";
import {useFirebase} from "../firebase";
import {IPlayerResults, IPlayers, IResults, ISettingAtTimes} from "../models";
import {calculateAll} from "../utils";

export const DataWrapper: React.FC = ({children}) => {
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
export const DataContext = React.createContext(defaultDataContext);