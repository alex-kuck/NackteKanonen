import { v2 } from '@shared/db';
import { formattedCurrency, formattedNumber } from '@shared/formatting';
import { has, values } from 'lodash';
import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import { AvatarLarge, AvatarSmall } from '../styled_components';
import { shouldFlip } from '../utils';
import { PlayerPresence } from './playerPresence';

export interface IPlayerProps {
    player: v2.Player;
    playerKey: string;
    meetings: v2.Meetings;
}

export const PlayerCollapsed = ({ player, playerKey, meetings }: IPlayerProps) => {
    const { totalMeetings, totalPresent } = statistics(playerKey, meetings);

    return (
        <Flipped inverseFlipId={`playerGrid-${playerKey}`}>
            <>
                <Flipped shouldFlip={shouldFlip(playerKey)} flipId={`logo-${playerKey}`}>
                    <AvatarSmall src={imgUrl(player.localURL)} alt="player avatar" />
                </Flipped>
                <Flipped shouldFlip={shouldFlip(playerKey)} flipId={`info-${playerKey}`}>
                    <div style={{ gridArea: 'info' }}>
                        <h2>{player.nickname}</h2>
                        <span>
                            Saldo: {formattedCurrency(v2.balance(player))}
                            <br />
                        </span>
                        <PlayerPresence totalEvents={totalMeetings} totalPresent={totalPresent} />
                    </div>
                </Flipped>
            </>
        </Flipped>
    );
};

const imgUrl = (imageName: string) => `/img/${imageName}`;

export const PlayerExpanded = ({ player, playerKey, meetings }: IPlayerProps) => {
    const { totalMeetings, totalPresent, playerStatistics } = statistics(playerKey, meetings);
    const { poodles, bells } = playerStatistics.reduce(
        (acc, curr) => ({
            poodles: acc.poodles + curr.poodles,
            bells: acc.bells + curr.bells,
        }),
        { poodles: 0, bells: 0 }
    );

    return (
        <Flipped inverseFlipId={`playerGrid-${playerKey}`}>
            <>
                <Flipped shouldFlip={shouldFlip(playerKey)} flipId={`logo-${playerKey}`}>
                    <AvatarLarge src={imgUrl(player.localURL)} alt="player avatar" />
                </Flipped>
                <Flipped shouldFlip={shouldFlip(playerKey)} flipId={`info-${playerKey}`}>
                    <div style={{ textAlign: 'center' }}>
                        <h2>{player.nickname}</h2>
                        <h3>{`${player.firstname} ${player.name}`}</h3>
                        <PlayerPresence totalEvents={totalMeetings} totalPresent={totalPresent} />
                        <br />
                        <span>
                            Saldo: {formattedCurrency(v2.balance(player))}
                            <br />
                        </span>
                    </div>
                </Flipped>
                <Flipped shouldFlip={shouldFlip(playerKey)} flipId={`additionalInfo-${playerKey}`}>
                    <div style={{ textAlign: 'center' }}>
                        <span>
                            Zu zahlen: {formattedCurrency(player.totalDue)}
                            <br />
                        </span>
                        <span>
                            Eingezahlt: {formattedCurrency(player.totalPaid)}
                            <br />
                        </span>
                        <br />
                        <span>
                            Pudel: {poodles} (&Oslash; {formattedNumber(poodles / totalPresent)})
                            <br />
                        </span>
                        <span>
                            Glöckchen: {bells} (&Oslash; {formattedNumber(bells / totalPresent)})
                            <br />
                        </span>
                    </div>
                </Flipped>
            </>
        </Flipped>
    );
};

const statistics = (playerKey: v2.PlayerId, meetings: v2.Meetings) => {
    const playerStatistics = values(meetings)
        .filter((it) => has(it.results, playerKey))
        .map((it) => it.results[playerKey]);
    const totalMeetings = playerStatistics.length;
    const totalPresent = playerStatistics.filter((it) => it.present).length;
    return { totalMeetings, totalPresent, playerStatistics };
};
