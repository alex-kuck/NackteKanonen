import { addFee, addMeeting, useFirebase, v2 } from '@shared/db';
import { useForm } from '@tanstack/react-form';
import { fromPairs, isEmpty, pick } from 'lodash';
import React from 'react';
import styles from '../app.module.css';
import { PlayersWithIds, playersWithIds } from './players-with-ids';

export function CreateMeetingPage() {
    const { players, settings } = useFirebase();

    return (
        <div className={styles['admin-main-centered']}>
            <div className={styles['admin-card-full']}>
                <h2 style={{ textAlign: 'center' }}>Neues Kegeln eintragen</h2>
                {!isEmpty(players) && !isEmpty(settings) && (
                    <CreateMeetingForm players={playersWithIds(players)} settings={settings} />
                )}
            </div>
        </div>
    );
}

function CreateMeetingForm({
    players,
    settings,
}: {
    players: PlayersWithIds;
    settings: v2.Settings;
}) {
    const form = useForm({
        defaultValues: {
            date: '',
            players: players.map((p) => ({
                ...p,
                present: false,
                poodles: 0,
                bells: 0,
                fee: 0.0,
            })),
        },
        onSubmit: async ({ value: { date, players }, formApi }) => {
            await createMeeting(date, players, settings)
                .then(() => {
                    alert('All fees saved successfully!');
                    formApi.reset();
                })
                .catch((err) => alert(JSON.stringify({ attention: 'Failed!', err })));
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            <form.Field name="date">
                {(field) => (
                    <label>
                        Kegel-Termin:&nbsp;
                        <input
                            type="date"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            required
                        />
                    </label>
                )}
            </form.Field>
            <table className={styles['meeting-table']}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Present</th>
                        <th>Poodles</th>
                        <th>Bells</th>
                        <th>Fee (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, idx) => (
                        <tr key={player.id}>
                            <td>
                                <div className={styles['player-row']}>
                                    {player.localURL && (
                                        <img
                                            src={`/img/${player.localURL}`}
                                            alt={player.nickname || player.name}
                                            className={styles['player-avatar']}
                                        />
                                    )}
                                    <span>{player.nickname || player.name || player.id}</span>
                                </div>
                            </td>
                            <td>
                                <form.Field name={`players[${idx}].present`}>
                                    {(field) => (
                                        <input
                                            type="checkbox"
                                            className={styles['styled-checkbox']}
                                            checked={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.checked)}
                                        />
                                    )}
                                </form.Field>
                            </td>
                            <td>
                                <form.Field name={`players[${idx}].poodles`}>
                                    {(field) => (
                                        <input
                                            type="number"
                                            min={0}
                                            step={1}
                                            className={styles['styled-input']}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(parseInt(e.target.value) || 0)
                                            }
                                        />
                                    )}
                                </form.Field>
                            </td>
                            <td>
                                <form.Field name={`players[${idx}].bells`}>
                                    {(field) => (
                                        <input
                                            type="number"
                                            min={0}
                                            step={1}
                                            className={styles['styled-input']}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(parseInt(e.target.value) || 0)
                                            }
                                        />
                                    )}
                                </form.Field>
                            </td>
                            <td>
                                <form.Field name={`players[${idx}].fee`}>
                                    {(field) => (
                                        <input
                                            type="number"
                                            min={0}
                                            step={0.01}
                                            className={styles['styled-input']}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(parseFloat(e.target.value) || 0)
                                            }
                                        />
                                    )}
                                </form.Field>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: 24 }}>
                <button type="submit" className={styles['submit-btn']}>
                    Create Meeting
                </button>
            </div>
        </form>
    );
}

const createMeeting = async (date: string, players: PlayersWithIds, settings: v2.Settings) => {
    const parsedDate = Date.parse(date);
    const feesByPlayer = players.map(
        (it) => [it.id, v2.meetingFee(parsedDate, it, settings)] as const
    );
    const meeting = v2.meeting(
        parsedDate,
        fromPairs(players.map(({ id, ...player }) => [id, statisticsFromPlayer(player)] as const))
    );

    return await Promise.allSettled([
        ...feesByPlayer.map(([playerId, fee]) => addFee(playerId, fee)),
        addMeeting(meeting),
    ]);
};

const statisticsFromPlayer = (player: v2.Player): v2.PlayerStatistics =>
    pick(player, ['poodles', 'bells', 'fee', 'present', 'member']);
