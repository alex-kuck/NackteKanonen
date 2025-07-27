import {FirebaseKey} from "../firebase/models";

export type Players = ByPlayerId<Player>
export type PlayerId = FirebaseKey;

export interface Player {
    name: string;
    firstname: string;
    nickname: string;

    // NEW
    activeMember: boolean;
    amountDue: number;
    amountDeposited: number;
}

type ByPlayerId<V> = ById<PlayerId, V>

type ById<K extends FirebaseKey, V> = {
    [key in K]: V;
};

export type PaymentId = FirebaseKey;

export interface Payment {
    amount: number;
    date: number;
    note?: string;
}

type Payments = ById<PaymentId, Payment>;
export type Deposits = ByPlayerId<Payments>
export type Withdrawals = ByPlayerId<Payments>
export type Fees = ByPlayerId<Payments>

export type MeetingId = FirebaseKey;

export interface Meetings {
    [key: MeetingId]: Meeting;
}

export interface Meeting {
    date: number;
    results: ByPlayerId<PlayerStatistics>
}

export interface PlayerStatistics {
    bells: number;
    poodles: number;
    fee: number;
    present: boolean;
    member: boolean;
}

export interface Settings {
    bellFee: number,
    memberFee: number,
    poodleFee: number
}

export type SettingsAtTime = ById<FirebaseKey, { date: number; setting: Settings }>;

export const meetingFee = (date: number, statistics: PlayerStatistics, setting: Settings): Payment => ({
    date,
    amount: statistics.fee + (statistics.bells * setting.bellFee) + (statistics.poodles * setting.poodleFee) + (statistics.member ? setting.memberFee : 0),
    // TODO: Format numbers
    note: `${statistics.bells} * ${setting.bellFee} + ${statistics.poodles} * ${setting.poodleFee} + ${statistics.member ? setting.memberFee : 0} + ${statistics.fee} Strafe`
})
