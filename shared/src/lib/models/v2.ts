import { formattedCurrency, formattedDate } from '@shared/formatting';
import { FirebaseKey } from '../firebase/models';

export type Players = ByPlayerId<Player>;
export type PlayerId = FirebaseKey;

export interface Player {
    name: string;
    firstname: string;
    nickname: string;
    email: string;
    member: boolean;
    present: boolean;
    bells: number;
    deposit: number;
    fee: number;
    poodles: number;
    localURL: string;
    totalDue: number;
    totalPaid: number;
}

type ByPlayerId<V> = ById<PlayerId, V>;

type ById<K extends FirebaseKey, V> = {
    [key in K]: V;
};

export type PaymentId = FirebaseKey;

export interface Payment {
    amount: number;
    date: number;
    note?: string;
}

export type Payments = ById<PaymentId, Payment>;
export type Deposits = ByPlayerId<Payments>;
export type Withdrawals = ByPlayerId<Payments>;
export type Fees = ByPlayerId<Payments>;

export const payment = (date: number, amount: number, note?: string): Payment => ({
    date,
    note,
    amount,
});

export type MeetingId = FirebaseKey;

export interface Meetings {
    [key: MeetingId]: Meeting;
}

export interface Meeting {
    date: number;
    results: ByPlayerId<PlayerStatistics>;
}

export const meeting = (date: number, results: ByPlayerId<PlayerStatistics>): Meeting => ({
    date,
    results,
});

export interface PlayerStatistics {
    bells: number;
    poodles: number;
    fee: number;
    present: boolean;
    member: boolean;
}

export interface Settings {
    bellFee: number;
    memberFee: number;
    poodleFee: number;
}

export type SettingsAtTime = ById<FirebaseKey, { date: number; setting: Settings }>;

export const meetingFee = (
    date: number,
    statistics: PlayerStatistics,
    setting: Settings
): Payment => ({
    date,
    amount:
        statistics.fee +
        statistics.bells * setting.bellFee +
        statistics.poodles * setting.poodleFee +
        (statistics.member ? setting.memberFee : 0),
    // TODO: Format numbers
    note: `Kegeln ${formattedDate(new Date(date))}
    Glöckchen: ${statistics.bells} * ${formattedCurrency(setting.bellFee)}
    Pudel: ${statistics.poodles} * ${formattedCurrency(setting.poodleFee)}
    Beitrag: ${formattedCurrency(statistics.member ? setting.memberFee : 0)}
    Strafe: ${formattedCurrency(statistics.fee)}`,
});

export const balance = (player: Pick<Player, 'totalDue' | 'totalPaid'>) =>
    player.totalPaid - player.totalDue;

export const clubKasseKey = 'club';
