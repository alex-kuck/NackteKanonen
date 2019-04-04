export interface IPlayerResults {
    [key: string]: IPlayerResult
}

export interface IPlayerResult {
    absentMember: number,
    absentGuest: number
    bells: number,
    bellFee: number,
    deposit: number,
    fee: number,
    guestFee: number,
    memberFee: number,
    poodles: number,
    poodleFee: number,
    presentMember: number,
    presentGuest: number,
}

export interface IPlayers {
    [key: string]: IPlayer
}

export interface IPlayer {
    name: string,
    firstname: string,
    nickname: string,
    email: string,
    member: boolean,
    present: boolean,
    bells: number,
    deposit: number,
    fee: number,
    poodles: number,
    localURL: string,
}

export interface IResults {
    [key: string]: IResultList
}

export interface IResultList {
    [key: string]: IResult
}

export interface IResult {
    bell: number,
    date: number,
    deposit: number,
    fee: number,
    member: boolean,
    poodle: number,
    present: boolean,
    setting: string
}

export interface ISettings {
    bellFee: number,
    guestFee: number,
    memberFee: number,
    poodleFee: number
}

export interface ISettingAtTimes {
    [key: string]: ISettingAtTime
}

export interface ISettingAtTime {
    date: number,
    setting: ISettings
}

export const emptyPlayers: IPlayers = {};
export const emptyResults: IResults = {};
export const emptySettings: ISettings = {
    bellFee: .5,
    guestFee: 0,
    memberFee: 10,
    poodleFee: .25
};
export const emptySettingsAtTime: ISettingAtTimes = {};
export const emptyPlayerResult: IPlayerResult = {
    absentMember: 0,
    absentGuest: 0,
    bells: 0,
    bellFee: 0,
    deposit: 0,
    fee: 0,
    guestFee: 0,
    memberFee: 0,
    poodles: 0,
    poodleFee: 0,
    presentMember: 0,
    presentGuest: 0,
};