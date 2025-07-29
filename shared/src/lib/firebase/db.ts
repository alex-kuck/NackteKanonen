import { onValue, push, ref, runTransaction } from 'firebase/database';
import { useEffect, useState } from 'react';
import {
    emptyPlayers,
    emptySettings,
    emptySettingsAtTime,
    ISettingAtTimes,
    ISettings,
    v2,
} from '../models';
import { db } from './firebase';

export function useFirebase() {
    const [players, setPlayers] = useState<v2.Players>(emptyPlayers);
    const [settings, setSettings] = useState<ISettings>(emptySettings);
    const [settingsAtTime, setSettingsAtTime] = useState<ISettingAtTimes>(emptySettingsAtTime);
    const [deposits, setDeposits] = useState<v2.Deposits>({});
    const [fees, setFees] = useState<v2.Fees>({});
    const [meetings, setMeetings] = useState<v2.Meetings>({});
    const [withdrawals, setWithdrawals] = useState<v2.Withdrawals>({});

    const getPlayers = () => {
        const playersRef = ref(db, 'players');
        onValue(playersRef, (snapshot) => {
            if (snapshot.exists()) {
                const players: v2.Players = snapshot.val();
                setPlayers(players);
            }
        });
    };

    const getSettings = () => {
        const settingsRef = ref(db, 'settings');
        onValue(settingsRef, (snapshot) => {
            if (snapshot.exists()) {
                const settings: ISettings = snapshot.val();
                setSettings(settings);
            }
        });
    };

    const getSettingsAtTime = () => {
        const settingsAtTimeRef = ref(db, 'settingsAtTime');
        onValue(settingsAtTimeRef, (snapshot) => {
            if (snapshot.exists()) {
                const settingsAtTime: ISettingAtTimes = snapshot.val();
                setSettingsAtTime(settingsAtTime);
            }
        });
    };

    const getDeposits = () => {
        const reference = ref(db, 'deposits');
        return onValue(reference, (snapshot) => {
            if (snapshot.exists()) {
                const data: v2.Deposits = snapshot.val();
                setDeposits(data);
            }
        });
    };

    const getFees = () => {
        const feesRef = ref(db, 'fees');
        return onValue(feesRef, (snapshot) => {
            if (snapshot.exists()) {
                const data: v2.Fees = snapshot.val();
                setFees(data);
            }
        });
    };

    const getMeetings = () => {
        const reference = ref(db, 'meetings');
        return onValue(reference, (snapshot) => {
            if (snapshot.exists()) {
                const data: v2.Meetings = snapshot.val();
                setMeetings(data);
            }
        });
    };

    const getWithdrawals = () => {
        const withdrawalsRef = ref(db, 'withdrawals');
        return onValue(withdrawalsRef, (snapshot) => {
            if (snapshot.exists()) {
                const withdrawals: v2.Withdrawals = snapshot.val();
                setWithdrawals(withdrawals);
            }
        });
    };

    useEffect(() => {
        getPlayers();
        getSettings();
        getSettingsAtTime();
        const depositsUnsubscribe = getDeposits();
        const feesUnsubscribe = getFees();
        const meetingsUnsubscribe = getMeetings();
        const withdrawalsUnsubscribe = getWithdrawals();

        return () => {
            depositsUnsubscribe();
            feesUnsubscribe();
            meetingsUnsubscribe();
            withdrawalsUnsubscribe();
        };
    }, []);

    return { players, settings, settingsAtTime, withdrawals, fees, deposits, meetings };
}

export const addFee = async (playerId: v2.PlayerId, payment: v2.Payment) => {
    const result = await createPayment('fees', playerId, payment);
    await runTransaction(playerRef(playerId), (player?: v2.Player) => {
        if (player) {
            player.totalDue += payment.amount;
        }
        return player;
    });
    return result!.key;
};

const createPayment = async (
    type: 'deposits' | 'fees' | 'withdrawals',
    playerId: v2.PlayerId,
    payment: v2.Payment
) => {
    const playerDepositRef = ref(db, `${type}/${playerId}`);
    return push(playerDepositRef, payment).catch((err) =>
        console.error(`Could not create ${type} ${payment} for ${playerId}`)
    );
};

export const addDeposit = async (playerId: v2.PlayerId, payment: v2.Payment) => {
    const result = await createPayment('deposits', playerId, payment);
    await runTransaction(playerRef(playerId), (player?: v2.Player) => {
        if (player) {
            player.totalPaid += payment.amount;
        }
        return player;
    });
    return result!.key;
};

export const addWithdrawal = async (playerId: v2.PlayerId, payment: v2.Payment) => {
    const result = await createPayment('withdrawals', playerId, payment);
    await runTransaction(playerRef(playerId), (player?: v2.Player) => {
        if (player) {
            player.totalPaid -= payment.amount;
        }
        return player;
    });
    return result!.key;
};

const playerRef = (playerId: v2.PlayerId) => ref(db, `players/${playerId}`);

export const addMeeting = async (meeting: v2.Meeting) => {
    const meetingsRef = ref(db, 'meetings');
    const newMeetingRef = await push(meetingsRef, meeting);
    return newMeetingRef.key;
};
