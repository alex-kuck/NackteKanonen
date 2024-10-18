import {useEffect, useRef, useState} from "react";
import {
    emptyPlayerResult,
    emptySettings,
    IPlayerResults,
    IResultList,
    IResults,
    ISettingAtTimes,
    ISettings
} from '../models';

export const calculateAll = (results: IResults, settingsAtTimes: ISettingAtTimes): IPlayerResults =>
    Object.entries(results).reduce((acc, [playerKey, resultList]: [string, IResultList]) => ({
        ...acc, [playerKey]: Object.values(resultList).reduce((acc, playerResult) => {
            const setting = safeSetting(settingsAtTimes, playerResult.setting);
            const {present, member, poodle, fee, bell, deposit} = playerResult;
            return {
                absentGuest: acc.absentGuest + (!present && !member ? 1 : 0),
                absentMember: acc.absentMember + (!present && member ? 1 : 0),
                bellFee: acc.bellFee + bell * setting.bellFee,
                bells: acc.bells + bell,
                deposit: acc.deposit + deposit,
                fee: acc.fee + fee,
                guestFee: acc.guestFee + (present && !member ? setting.guestFee : 0),
                memberFee: acc.memberFee + (member ? setting.memberFee : 0),
                poodleFee: acc.poodleFee + poodle * setting.poodleFee,
                poodles: acc.poodles + poodle,
                presentGuest: acc.presentGuest + (present && !member ? 1 : 0),
                presentMember: acc.presentMember + (present && member ? 1 : 0),
            };
        }, emptyPlayerResult)
    }), {});

export const formattedNumber = (value: number) => new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}).format(value);

export const formattedCurrency = (value: number) => new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}).format(value);

export const shouldFlip = (playerKey: string) => (_prev: string, current: string) => playerKey === current;

const safeSetting = (settings: ISettingAtTimes, settingsKey: string): ISettings => settings[settingsKey] ? settings[settingsKey].setting : emptySettings;

export function useCountdown(targetDateInMillisUTC: number): string {
    const [currentTime, setCurrentTime] = useState(Date.now());
    const timeoutRef = useRef(0);

    useEffect(() => {
        function tick() {
            setCurrentTime(Date.now());
        }

        timeoutRef.current = window.setInterval(tick, 200);
        return () => clearInterval(timeoutRef.current);
    }, [setCurrentTime]);

    const delta = targetDateInMillisUTC < currentTime ? 0 : targetDateInMillisUTC - currentTime;
    const seconds = withLeadingZeros(Math.floor((delta / 1000)) % 60, 2);
    const minutes = withLeadingZeros(Math.floor((delta / 1000 / 60)) % 60, 2);
    const hours = withLeadingZeros(Math.floor((delta / 1000 / 60 / 60)) % 24, 2);
    const days = withLeadingZeros(Math.floor((delta / 1000 / 60 / 60 / 24)), 2);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export const withLeadingZeros = (value: number, targetLength: number) => value.toString().padStart(targetLength, '0');
