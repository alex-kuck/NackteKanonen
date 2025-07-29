import { DatabaseReference, get, push, ref, remove, set, update } from 'firebase/database';
import { entries, groupBy, isNil, negate, values } from 'lodash';
import { db } from '../../firebase/firebase';
import { IResult, IResults, ISettingAtTimes, ISettings } from '../v1';
import { Meeting, meeting, meetingFee as v2MeetingFee, Payment } from '../v2';

export const deposit = (result: Pick<IResult, 'date' | 'deposit'>): Payment | undefined =>
    result.deposit > 0
        ? {
              date: result.date * 1000,
              amount: result.deposit,
          }
        : undefined;

export const withdrawal = (result: Pick<IResult, 'date' | 'deposit'>): Payment | undefined =>
    result.deposit < 0
        ? {
              date: result.date * 1000,
              amount: result.deposit * -1,
          }
        : undefined;

export const meetingFee = (result: IResult, settings: ISettings): Payment =>
    v2MeetingFee(
        result.date * 1000,
        {
            ...result,
            bells: result.bell,
            poodles: result.poodle,
        },
        settings
    );

export const migratePayments = async () => {
    const resultsSnapshot = await get(ref(db, 'results'));
    if (!resultsSnapshot.exists()) return;

    const settingsAtTimeSnapshot = await get(ref(db, 'settingsAtTime'));
    if (!settingsAtTimeSnapshot.exists()) return;

    const results = resultsSnapshot.val() as IResults;
    const settingsAtTime = settingsAtTimeSnapshot.val() as ISettingAtTimes;

    let overallDue = 0;
    let overallFees = 0;
    let overallDeposited = 0;
    let overallWithdrawn = 0;

    for (const playerId of Object.keys(results)) {
        console.log('----------------------------------------');
        console.log(`Migrating payments for player ${playerId}`);
        const playerResults = results[playerId];
        console.log(`Player ${playerId} has ${Object.keys(playerResults).length} results`);

        const deposits = Object.values(playerResults).map(deposit).filter(Boolean);
        const totalDeposited = deposits.reduce((sum, payment) => sum + (payment?.amount || 0), 0);
        console.log(
            `Player ${playerId} has ${deposits.length} deposits totaling ${totalDeposited}`
        );

        const withdrawals = Object.values(playerResults).map(withdrawal).filter(Boolean);
        const totalWithdrawn = withdrawals.reduce(
            (sum, payment) => sum + (payment?.amount || 0),
            0
        );
        console.log(
            `Player ${playerId} has ${withdrawals.length} withdrawals totaling ${totalWithdrawn}`
        );

        const meetingFees = Object.values(playerResults).map((result) => {
            const settings = settingsAtTime[result.setting].setting;
            return meetingFee(result, settings);
        });
        const totalFees = meetingFees.reduce((sum, payment) => sum + (payment?.amount || 0), 0);
        console.log(`Player ${playerId} has ${meetingFees.length} meetings totaling ${totalFees}`);

        const totalDue = totalFees + totalWithdrawn;
        const totalBalance = totalDeposited - totalDue;
        console.log(`Player ${playerId} has a balance of ${totalBalance}`);

        if (playerId !== '-Ka3tbKzyn3IUfa-kYvP') {
            overallDue += totalDue;
        }
        overallFees += totalFees;
        overallDeposited += totalDeposited;
        overallWithdrawn += totalWithdrawn;

        updatePlayer(playerId, deposits, withdrawals, meetingFees);

        console.log('----------------------------------------');
    }
    console.log(`Overall due: ${overallDue}`);
    console.log(`Overall deposited: ${overallDeposited}`);
    console.log(`Overall balance: ${overallDeposited - overallDue}`);
    console.log(`Kassenstand: ${overallDeposited - overallWithdrawn}`);
    console.log(`Mit ausstehenden Zahlungen: ${overallFees - overallWithdrawn}`);
};

const updatePlayer = async (
    playerId: string,
    deposits: (Payment | undefined)[],
    withdrawals: (Payment | undefined)[],
    meetingFees: Payment[]
) => {
    console.log(`Updating player ${playerId} in DB`);

    const totalDeposited = deposits.reduce((sum, payment) => sum + (payment?.amount || 0), 0);
    console.log(`Player ${playerId} has ${deposits.length} deposits totaling ${totalDeposited}`);

    const totalWithdrawn = withdrawals.reduce((sum, payment) => sum + (payment?.amount || 0), 0);
    console.log(
        `Player ${playerId} has ${withdrawals.length} withdrawals totaling ${totalWithdrawn}`
    );
    const totalFees = meetingFees.reduce((sum, payment) => sum + (payment?.amount || 0), 0);
    console.log(`Player ${playerId} has ${meetingFees.length} meetings totaling ${totalFees}`);

    const totalDue = totalFees;
    const totalPaid = totalDeposited - totalWithdrawn;

    await addEntries(ref(db, `deposits/${playerId}`), deposits);
    await addEntries(ref(db, `withdrawals/${playerId}`), withdrawals);
    await addEntries(ref(db, `fees/${playerId}`), meetingFees);

    const playerRef = ref(db, `players/${playerId}`);
    await update(playerRef, { totalDue, totalPaid }).catch(updateFailed);
};

const addEntries = async <T>(ref: DatabaseReference, data: (T | undefined)[]) => {
    for (const element of data.filter(negate(isNil))) {
        await push(ref, element).catch(updateFailed);
    }
};

export const migrateMeetings = async () => {
    const resultsSnapshot = await get(ref(db, 'results'));
    if (!resultsSnapshot.exists()) return;

    const results = resultsSnapshot.val() as IResults;
    const allResults = entries(results).flatMap(([playerId, playerResults]) =>
        values(playerResults).map((result) => ({
            ...result,
            playerId,
        }))
    );
    const resultsByDate = groupBy(allResults, 'date');
    const meetings = entries(resultsByDate).map(([date, results]) => createMeeting(date, results));
    await addEntries(ref(db, 'meetings'), meetings);
};

const updateFailed = (err: any) => console.error('Update failed:', err);

type PlayerResults = (IResult & { playerId: string })[];

const createMeeting = (date: string, results: PlayerResults) => {
    const playerStatistics: Meeting['results'] = {};
    results.forEach((result) => {
        playerStatistics[result.playerId] = {
            bells: result.bell,
            poodles: result.poodle,
            fee: result.fee,
            present: result.present,
            member: result.member,
        };
    });

    return meeting(Number(date) * 1000, playerStatistics);
};

export const migrateKasseKey = async () => {
    console.log(`Migrate Kasse key`);
    const playerRef = ref(db, 'players/-Ka3tbKzyn3IUfa-kYvP');
    const kassePlayer = await get(playerRef);
    if (!kassePlayer.exists()) {
        console.error('Kasse player not found.');
    }

    const kassePlayerData = kassePlayer.val();
    console.log('Updating Kasse player data with new key');
    await set(ref(db, 'players/club'), kassePlayerData).catch(updateFailed);
    await remove(playerRef);

    const resultRef = ref(db, 'results/-Ka3tbKzyn3IUfa-kYvP');
    const kasseResults = await get(resultRef);
    if (!kasseResults.exists()) {
        console.error('Kasse results not found.');
    }

    const kasseResultData = kasseResults.val();
    console.log('Updating Kasse results data with new key');
    await set(ref(db, 'results/club'), kasseResultData).catch(updateFailed);
    await remove(resultRef);
};
