import {IPlayerResult, IResults, ISettingAtTimes} from '@shared/db';
import {calculateAll} from "./index";

describe('utils', function () {
    test('calculate results', function () {
        const results: IResults = {
            player1: {
                one: {
                    date: 123,
                    bell: 1,
                    poodle: 2,
                    present: false,
                    fee: 0.5,
                    setting: 'one',
                    member: true,
                    deposit: 10
                },
                two: {
                    date: 123,
                    bell: 0,
                    poodle: 1,
                    present: true,
                    fee: 0,
                    setting: 'two',
                    member: false,
                    deposit: 50
                }
            }
        };
        const settings: ISettingAtTimes = {
            one: {
                date: new Date().getMilliseconds(),
                setting: {
                    poodleFee: .1,
                    bellFee: .25,
                    memberFee: 10,
                    guestFee: 5
                }
            },
            two: {
                date: new Date().getMilliseconds(),
                setting: {
                    poodleFee: .2,
                    bellFee: .25,
                    memberFee: 10,
                    guestFee: 5
                }
            }
        };

        const {one, two} = results.player1;

        const expected: { [key: string]: IPlayerResult } = {
            player1: {
                bells: one.bell + two.bell,
                bellFee: one.bell * settings[one.setting].setting.bellFee + two.bell * settings[two.setting].setting.bellFee,
                poodles: one.poodle + two.poodle,
                poodleFee: one.poodle * settings[one.setting].setting.poodleFee + two.poodle * settings[two.setting].setting.poodleFee,
                fee: one.fee + two.fee,
                memberFee: (one.member ? settings[one.setting].setting.memberFee : 0) + (two.member ? settings[two.setting].setting.memberFee : 0),
                guestFee: (!one.member ? settings[one.setting].setting.guestFee : 0) + (!two.member ? settings[two.setting].setting.guestFee : 0),
                presentMember: one.present && one.member ? 1 : 0 + (two.present && two.member ? 1 : 0),
                presentGuest: one.present && !one.member ? 1 : 0 + (two.present && !two.member ? 1 : 0),
                absentMember: !one.present && one.member ? 1 : 0 + (!two.present && two.member ? 1 : 0),
                absentGuest: !one.present && !one.member ? 1 : 0 + (!two.present && !two.member ? 1 : 0),
                deposit: one.deposit + two.deposit,
                date: Math.max(one.date, two.date),
            }
        };

        expect(calculateAll(results, settings)).toEqual(expected);
    });
});
