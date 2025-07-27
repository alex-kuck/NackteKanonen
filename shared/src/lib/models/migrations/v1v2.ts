import {IResult, ISettings} from "../v1";
import {meetingFee as v2MeetingFee, Payment} from "../v2";

export const deposit = (result: Pick<IResult, 'date' | 'deposit'>): Payment | undefined => result.deposit > 0 ? {
    date: result.date,
    amount: result.deposit
} : undefined

export const withdrawal = (result: Pick<IResult, 'date' | 'deposit'>): Payment | undefined => result.deposit < 0 ? {
    date: result.date,
    amount: result.deposit
} : undefined

export const meetingFee = (result: IResult, settings: ISettings): Payment =>
    v2MeetingFee(result.date, {
        ...result,
        bells: result.bell,
        poodles: result.poodle
    }, settings)
