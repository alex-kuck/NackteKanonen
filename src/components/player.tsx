import { IPlayer, IPlayerResult } from "../models";
import React from "react";
import { AvatarLarge, AvatarSmall } from "../styled_components";
import { formattedCurrency, formattedNumber, shouldFlip } from "../utils";
import { Flipped } from "react-flip-toolkit";
import { PlayerPresence } from "./playerPresence";

export interface IPlayerProps {
    player: IPlayer,
    playerKey: string,
    result: IPlayerResult,
}

export const PlayerCollapsed: React.FC<IPlayerProps> = ({ player, playerKey, result }) => {
    const { deposit, fee, poodleFee, bellFee, absentGuest, absentMember, presentGuest, presentMember, guestFee, memberFee } = result;
    const totalPresent = presentMember + presentGuest;
    const totalEvents = totalPresent + absentMember + absentGuest;
    const toPay = fee + poodleFee + bellFee + memberFee + guestFee;
    const saldo = deposit - toPay;

    return (
        <Flipped inverseFlipId={ `playerGrid-${ playerKey }` }>
            <>
                <Flipped shouldFlip={ shouldFlip(playerKey) } flipId={ `logo-${ playerKey }` }>
                    <AvatarSmall src={ imgUrl(player.localURL) } alt='player avatar'/>
                </Flipped>
                <Flipped shouldFlip={ shouldFlip(playerKey) } flipId={ `info-${ playerKey }` }>
                    <div style={ { gridArea: 'info' } }>
                        <h2>{ player.nickname }</h2>
                        <span>Saldo: { formattedCurrency(saldo) }<br/></span>
                        <PlayerPresence totalEvents={ totalEvents } totalPresent={ totalPresent }/>
                    </div>
                </Flipped>
            </>
        </Flipped>
    );
};

const imgUrl = (imageName: string) => `/img/${ imageName }`;

export const PlayerExpanded: React.FC<IPlayerProps> = ({ player, result, playerKey }) => {
    const { deposit, fee, poodleFee, bellFee, absentGuest, absentMember, presentGuest, presentMember, guestFee, memberFee, poodles, bells } = result;
    const totalPresent = presentMember + presentGuest;
    const totalEvents = totalPresent + absentMember + absentGuest;
    const toPay = fee + poodleFee + bellFee + memberFee + guestFee;
    const saldo = deposit - toPay;

    return (
        <Flipped inverseFlipId={ `playerGrid-${ playerKey }` }>
            <>
                <Flipped shouldFlip={ shouldFlip(playerKey) } flipId={ `logo-${ playerKey }` }>
                    <AvatarLarge src={ imgUrl(player.localURL) } alt='player avatar'/>
                </Flipped>
                <Flipped shouldFlip={ shouldFlip(playerKey) } flipId={ `info-${ playerKey }` }>
                    <div style={ { textAlign: 'center' } }>
                        <h2>{ player.nickname }</h2>
                        <h3>{ `${ player.firstname } ${ player.name }` }</h3>
                        <PlayerPresence totalEvents={ totalEvents } totalPresent={ totalPresent }/>
                        <br/>
                        <span>Saldo: { formattedCurrency(saldo) }<br/></span>
                    </div>
                </Flipped>
                <Flipped shouldFlip={ shouldFlip(playerKey) }
                         flipId={ `additionalInfo-${ playerKey }` }>
                    <div style={ { textAlign: 'center' } }>
                        <span>Zu zahlen: { formattedCurrency(toPay) }<br/></span>
                        <span>Eingezahlt: { formattedCurrency(deposit) }<br/></span>
                        <br/>
                        <span>Pudel: { poodles } (&Oslash; { formattedNumber(poodles / totalPresent) })<br/></span>
                        <span>Glöckchen: { bells } (&Oslash; { formattedNumber(bells / totalPresent) })<br/></span>
                    </div>
                </Flipped>
            </>
        </Flipped>
    );
};
