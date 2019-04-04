import {db} from './firebase';
import {useEffect, useState} from "react";
import {
    emptyPlayers,
    emptyResults, emptySettings, emptySettingsAtTime,
    IPlayers,
    IResults,
    ISettingAtTimes,
    ISettings
} from "../models";

export interface IFirebaseData {
    players: IPlayers,
    results: IResults,
    settings: ISettings,
    settingsAtTime: ISettingAtTimes
}

export function useFirebase(): (IFirebaseData) {
    const [players, setPlayers] = useState<IPlayers>(emptyPlayers);
    const [results, setResults] = useState<IResults>(emptyResults);
    const [settings, setSettings] = useState<ISettings>(emptySettings);
    const [settingsAtTime, setSettingsAtTime] = useState<ISettingAtTimes>(emptySettingsAtTime);

    const getPlayers = () => db.ref('players').on('value', snapshot => {
        if (snapshot !== null) {
            const players: IPlayers = snapshot.val();
            setPlayers(players);
        }
    });

    const getResults = () => db.ref('results').on('value', snapshot => {
        if (snapshot !== null) {
            const results: IResults = snapshot.val();
            setResults(results);
        }
    });

    const getSettings = () => db.ref('settings').on('value', snapshot => {
        if (snapshot !== null) {
            const settings: ISettings = snapshot.val();
            setSettings(settings);
        }
    });

    const getSettingsAtTime = () => db.ref('settingsAtTime').on('value', snapshot => {
        if (snapshot !== null) {
            const settingsAtTime: ISettingAtTimes = snapshot.val();
            setSettingsAtTime(settingsAtTime);
        }
    });

    useEffect(() => {
        getPlayers();
        getResults();
        getSettings();
        getSettingsAtTime();
    }, []);

    return {players, results, settings, settingsAtTime};
}