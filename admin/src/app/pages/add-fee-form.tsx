import { addFee, v2 } from '@shared/db';
import { useForm } from '@tanstack/react-form';
import React from 'react';
import styles from '../app.module.css';
import { PlayersWithIds } from './players-with-ids';

export function AddFeeForm({ players }: { players: PlayersWithIds }) {
    const selectablePlayers = [
        ...players.map((player) => ({
            id: player.id,
            label: player.nickname || player.name || player.id,
            localURL: player.localURL,
            alt: player.nickname || player.name,
        })),
        {
            id: v2.clubKasseKey,
            label: 'Kegelkasse',
            localURL: undefined,
            alt: 'Kegelkasse',
        },
    ];

    const form = useForm({
        defaultValues: {
            date: new Date().toISOString().slice(0, 10),
            amount: 0,
            note: '',
            players: selectablePlayers.map((player) => ({
                id: player.id,
                selected: false,
            })),
        },
        onSubmit: async ({ value: { date, amount, note, players }, formApi }) => {
            const selectedPlayerIds = players.filter((player) => player.selected).map((p) => p.id);

            if (selectedPlayerIds.length === 0) {
                alert('Please select at least one player.');
                return;
            }

            const payment = v2.payment(Date.parse(date), amount, note.trim() || undefined);
            const results = await Promise.allSettled(selectedPlayerIds.map((playerId) => addFee(playerId, payment)));
            const failures = results.filter((result) => result.status === 'rejected');

            if (failures.length > 0) {
                alert(`Failed to create ${failures.length} of ${selectedPlayerIds.length} fees.`);
                return;
            }

            alert(`Created ${selectedPlayerIds.length} fee entries successfully.`);
            formApi.reset();
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
                        Date:&nbsp;
                        <input
                            type="date"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            required
                        />
                    </label>
                )}
            </form.Field>
            <br />
            <form.Field name="amount">
                {(field) => (
                    <label>
                        Amount (EUR):&nbsp;
                        <input
                            type="number"
                            min={0}
                            step={0.01}
                            className={styles['styled-input']}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(parseFloat(e.target.value) || 0)}
                            required
                        />
                    </label>
                )}
            </form.Field>
            <br />
            <form.Field name="note">
                {(field) => (
                    <label>
                        Note:&nbsp;
                        <textarea
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    </label>
                )}
            </form.Field>
            <br />

            <form.Field name="players">
                {(field) => {
                    const selectedCount = field.state.value.filter((player) => player.selected).length;

                    return (
                        <div className={styles['selection-controls']}>
                            <span>{selectedCount} selected</span>
                            <div className={styles['selection-controls-actions']}>
                                <button
                                    type="button"
                                    className={styles['secondary-btn']}
                                    onClick={() =>
                                        field.handleChange(
                                            field.state.value.map((player) => ({ ...player, selected: true }))
                                        )
                                    }
                                >
                                    Select all
                                </button>
                                <button
                                    type="button"
                                    className={styles['secondary-btn']}
                                    onClick={() =>
                                        field.handleChange(
                                            field.state.value.map((player) => ({ ...player, selected: false }))
                                        )
                                    }
                                >
                                    Deselect all
                                </button>
                            </div>
                        </div>
                    );
                }}
            </form.Field>

            <table className={styles['meeting-table']}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Apply Fee</th>
                    </tr>
                </thead>
                <tbody>
                    {selectablePlayers.map((player, idx) => (
                        <tr key={player.id}>
                            <td>
                                <div className={styles['player-row']}>
                                    {player.localURL && (
                                        <img
                                            src={`/img/${player.localURL}`}
                                            alt={player.alt}
                                            className={styles['player-avatar']}
                                        />
                                    )}
                                    <span>{player.label}</span>
                                </div>
                            </td>
                            <td>
                                <form.Field name={`players[${idx}].selected`}>
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
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: 24 }}>
                <form.Subscribe
                    selector={(state) => [state.isSubmitting, state.values.amount]}
                    children={([isSubmitting, amount]) => (
                        <button
                            type="submit"
                            className={styles['submit-btn']}
                            disabled={isSubmitting || amount <= 0}
                        >
                            Create Fees
                        </button>
                    )}
                />
            </div>
        </form>
    );
}
