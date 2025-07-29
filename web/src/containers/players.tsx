import React, { useReducer } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { Overview, PlayerCollapsed, PlayerExpanded } from '../components';
import { PlayerGridCollapsed, PlayerGridExpanded, PlayersGrid } from '../styled_components';
import { shouldFlip } from '../utils';
import { useDataContext } from './data';

interface IExpandState {
    expanded: string[];
    last?: string;
}

interface IAction {
    type: string;
    payload: string;
}

function reducer(state: IExpandState, action: IAction) {
    switch (action.type) {
        case 'TOGGLE':
            return {
                expanded: state.expanded.includes(action.payload)
                    ? state.expanded.filter((key) => key !== action.payload)
                    : [...state.expanded, action.payload],
                last: action.payload,
            };
        default:
            return state;
    }
}

export const PlayersContainer = () => {
    const { players, meetings } = useDataContext();

    const [state, dispatch] = useReducer(reducer, {
        expanded: [],
    } as IExpandState);
    const { expanded, last } = state;

    const isExpanded = (playerKey: string): boolean => expanded.includes(playerKey);
    const togglePlayer = (playerKey: string) => dispatch({ type: 'TOGGLE', payload: playerKey });

    return (
        <>
            <Overview />
            <h1>Mitglieder</h1>
            <Flipper decisionData={last} spring={'stiff'} flipKey={expanded.toString()}>
                <PlayersGrid>
                    {Object.keys(players).map((key) =>
                        isExpanded(key) ? (
                            <Flipped
                                shouldFlip={shouldFlip(key)}
                                flipId={`playerGrid-${key}`}
                                key={key}
                            >
                                <PlayerGridExpanded onClick={() => togglePlayer(key)}>
                                    <PlayerExpanded
                                        player={players[key]}
                                        meetings={meetings}
                                        playerKey={key}
                                    />
                                </PlayerGridExpanded>
                            </Flipped>
                        ) : (
                            <Flipped flipId={`playerGrid-${key}`} key={key}>
                                <PlayerGridCollapsed onClick={() => togglePlayer(key)}>
                                    <PlayerCollapsed
                                        player={players[key]}
                                        playerKey={key}
                                        meetings={meetings}
                                    />
                                </PlayerGridCollapsed>
                            </Flipped>
                        )
                    )}
                </PlayersGrid>
            </Flipper>
        </>
    );
};
