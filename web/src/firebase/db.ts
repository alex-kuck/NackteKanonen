import { db } from './firebase';
import { ref, onValue } from 'firebase/database';
import { useEffect, useState } from "react";
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
    const [ players, setPlayers ] = useState<IPlayers>(emptyPlayers);
    const [ results, setResults ] = useState<IResults>(emptyResults);
    const [ settings, setSettings ] = useState<ISettings>(emptySettings);
    const [ settingsAtTime, setSettingsAtTime ] = useState<ISettingAtTimes>(emptySettingsAtTime);

    const getPlayers = () => {
        const playersRef = ref(db, 'players');
        onValue(playersRef, snapshot => {
            if (snapshot.exists()) {
                const players: IPlayers = snapshot.val();
                setPlayers(players);
            }
        });
    };

    const getResults = () => {
        const resultsRef = ref(db, 'results');
        onValue(resultsRef, snapshot => {
            if (snapshot.exists()) {
                const results: IResults = snapshot.val();
                setResults(results);
            }
        });
    };

    const getSettings = () => {
        const settingsRef = ref(db, 'settings');
        onValue(settingsRef, snapshot => {
            if (snapshot.exists()) {
                const settings: ISettings = snapshot.val();
                setSettings(settings);
            }
        });
    };

    const getSettingsAtTime = () => {
        const settingsAtTimeRef = ref(db, 'settingsAtTime');
        onValue(settingsAtTimeRef, snapshot => {
            if (snapshot.exists()) {
                const settingsAtTime: ISettingAtTimes = snapshot.val();
                setSettingsAtTime(settingsAtTime);
            }
        });
    };

    useEffect(() => {
        getPlayers();
        getResults();
        getSettings();
        getSettingsAtTime();
    }, []);

    return { players, results, settings, settingsAtTime };
}
