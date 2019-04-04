import React, {useContext, useReducer, useState} from "react";
import {Flipper, Flipped} from 'react-flip-toolkit';

import {DataContext} from "./data";
import {emptyPlayerResult, IPlayerResult} from "../models";
import {PlayerGridCollapsed, PlayerGridExpanded, PlayersGrid} from "../styled_components";
import {formattedNumber, shouldFlip} from "../utils";
import {PlayerCollapsed, PlayerExpanded} from "../components";
import {Overview} from "../App";

export const PlayerContainer: React.FC = () => {
    const {players, playerResults} = useContext(DataContext);

    interface IExpandState {
        expanded: string[],
        last: string | null,
    }

    interface IAction {
        type: string,
        payload: string,
    }

    function reducer(state: IExpandState, action: IAction) {
        switch (action.type) {
            case 'TOGGLE':
                return {
                    expanded: state.expanded.includes(action.payload) ? state.expanded.filter(key => key !== action.payload) : [...state.expanded, action.payload],
                    last: action.payload
                };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, {expanded: [], last: null} as IExpandState);
    const {expanded, last} = state;

    const showing = (playerKey: string): boolean => expanded.includes(playerKey);
    const togglePlayer = (playerKey: string) => dispatch({type: 'TOGGLE', payload: playerKey});

    const totalInformation = Object.values(playerResults).reduce((acc, result) => ({
        deposit: acc.deposit + result.deposit,
        toPay: acc.toPay + result.bellFee + result.poodleFee + result.fee + result.memberFee + result.guestFee + (result.deposit < 0 ? result.deposit : 0)
    }), {
        deposit: 0,
        toPay: 0
    });

    const resultFor = (playerKey: string): IPlayerResult => (playerResults[playerKey] || emptyPlayerResult);
    const kasseKey = '-Ka3tbKzyn3IUfa-kYvP';

    return (
        <>
            <Overview />
            <h1>Mitglieder</h1>
            <Flipper decisionData={last} spring={'stiff'} flipKey={expanded.toString()}>
                <PlayersGrid>
                    {
                        Object.keys(players).filter(key => key !== kasseKey).map(key =>
                            showing(key) ?
                                <Flipped shouldFlip={shouldFlip(key)} flipId={`playerGrid-${key}`}
                                         key={key}>
                                    <PlayerGridExpanded onClick={() => togglePlayer(key)}>
                                        <PlayerExpanded player={players[key]}
                                                        result={resultFor(key)}
                                                        playerKey={key}/>
                                    </PlayerGridExpanded>
                                </Flipped> :
                                <Flipped flipId={`playerGrid-${key}`} key={key}>
                                    <PlayerGridCollapsed onClick={() => togglePlayer(key)}>
                                        <PlayerCollapsed player={players[key]} playerKey={key}
                                                         result={resultFor(key)}/>
                                    </PlayerGridCollapsed>
                                </Flipped>
                        )
                    }
                </PlayersGrid>
            </Flipper>
        </>
    );
};