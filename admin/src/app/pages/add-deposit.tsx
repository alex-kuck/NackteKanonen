import { addDeposit, useFirebase, v2 } from '@shared/db';
import { useForm } from '@tanstack/react-form';
import { isEmpty } from 'lodash';
import React from 'react';
import * as z from 'zod';
import styles from '../app.module.css';
import { PlayersWithIds, playersWithIds } from './players-with-ids';

export function AddDepositPage() {
    const { players } = useFirebase();

    return (
        <div className={styles['admin-main-centered']}>
            <div className={styles['admin-card-full']}>
                <h2 style={{ textAlign: 'center' }}>Add Deposit</h2>
                {!isEmpty(players) && <AddDepositForm players={playersWithIds(players)} />}
            </div>
        </div>
    );
}

const depositSchema = z
    .object({
        date: z.iso.date(),
        amount: z.number().gt(0),
        player: z.object({
            id: z.string().min(1),
        }),
        note: z.string().optional(),
    })
    .required();

function AddDepositForm({ players }: { players: PlayersWithIds }) {
    const form = useForm({
        defaultValues: {
            date: new Date().toISOString().slice(0, 10),
            player: { id: '' },
            amount: 0,
            note: '',
        },
        onSubmit: async ({ value: { date, amount, player, note }, formApi }) => {
            const deposit = v2.payment(Date.parse(date), amount, note);
            await addDeposit(player.id, deposit)
                .then(() => {
                    alert('Deposit saved successfully!');
                    formApi.reset();
                })
                .catch((err) => alert(JSON.stringify({ attention: 'Failed!', err })));
        },
        validators: { onChange: depositSchema },
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
            <form.Field name="player">
                {(field) => (
                    <label>
                        Player:&nbsp;
                        <select
                            value={field.state.value.id}
                            onChange={(e) => field.handleChange({ id: e.target.value })}
                            required
                        >
                            <option value=""></option>
                            {players.map(({ id, nickname }) => (
                                <option key={id} value={id}>
                                    {nickname}
                                </option>
                            ))}
                            <option value={v2.clubKasseKey}>Kegelkasse</option>
                        </select>
                    </label>
                )}
            </form.Field>
            <br />
            <form.Field name="amount">
                {(field) => (
                    <label>
                        Amount (€):&nbsp;
                        <input
                            type="number"
                            min={0}
                            step={0.01}
                            className={styles['styled-input']}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(parseFloat(e.target.value) || 0)}
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
            <div style={{ marginTop: 24 }}>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <button
                            type="submit"
                            className={styles['submit-btn']}
                            disabled={!canSubmit || isSubmitting}
                        >
                            Create Deposit
                        </button>
                    )}
                />
            </div>
        </form>
    );
}
