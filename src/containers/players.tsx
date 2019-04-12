import React, { useContext, useReducer, useState } from "react";
import { Flipper, Flipped } from 'react-flip-toolkit';

import { DataContext } from "./data";
import { emptyPlayerResult, IPlayerResult } from "../models";
import { PlayerGridCollapsed, PlayerGridExpanded, PlayersGrid } from "../styled_components";
import { formattedNumber, shouldFlip } from "../utils";
import { PlayerCollapsed, PlayerExpanded } from "../components";
import { Overview } from "../components";

interface IExpandState {
    expanded: string[],
    last?: string,
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

export const PlayersContainer: React.FC = () => {
    const { players, playerResults } = useContext(DataContext);

    const [state, dispatch] = useReducer(reducer, { expanded: [] } as IExpandState);
    const { expanded, last } = state;

    const isExpanded = (playerKey: string): boolean => expanded.includes(playerKey);
    const togglePlayer = (playerKey: string) => dispatch({ type: 'TOGGLE', payload: playerKey });

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
                            isExpanded(key) ?
                                <Flipped shouldFlip={shouldFlip(key)} flipId={`playerGrid-${key}`}
                                    key={key}>
                                    <PlayerGridExpanded onClick={() => togglePlayer(key)}>
                                        <PlayerExpanded player={players[key]}
                                            result={resultFor(key)}
                                            playerKey={key} />
                                    </PlayerGridExpanded>
                                </Flipped> :
                                <Flipped flipId={`playerGrid-${key}`} key={key}>
                                    <PlayerGridCollapsed onClick={() => togglePlayer(key)}>
                                        <PlayerCollapsed player={players[key]} playerKey={key}
                                            result={resultFor(key)} />
                                    </PlayerGridCollapsed>
                                </Flipped>
                        )
                    }
                </PlayersGrid>
            </Flipper>
        </>
    );
};