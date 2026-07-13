import { v2 } from '@shared/db';
import { formattedCurrency, formattedDate } from '@shared/formatting';
import React from 'react';
import styles from '../app.module.css';

interface RecentPaymentsProps {
    payments: v2.Deposits | v2.Fees;
    players: v2.Players;
    title: string;
}

interface PaymentWithPlayer {
    playerId: v2.PlayerId;
    payment: v2.Payment;
}

const playerLabel = (players: v2.Players, playerId: v2.PlayerId) => {
    if (playerId === v2.clubKasseKey) {
        return 'Kegelkasse';
    }

    const player = players[playerId];
    if (!player) {
        return playerId;
    }

    return player.nickname || `${player.firstname} ${player.name}`.trim();
};

const recentPayments = (payments: v2.Deposits | v2.Fees): PaymentWithPlayer[] =>
    Object.entries(payments)
        .flatMap(([playerId, playerPayments]) =>
            Object.values(playerPayments ?? {}).map((payment) => ({
                playerId: playerId as v2.PlayerId,
                payment,
            }))
        )
        .sort((a, b) => b.payment.date - a.payment.date)
        .slice(0, 5);

export function RecentPayments({ payments, players, title }: RecentPaymentsProps) {
    const latestPayments = recentPayments(payments);

    return (
        <section className={styles['recent-payments']}>
            <h3>{title}</h3>
            {latestPayments.length === 0 ? (
                <p>No entries yet.</p>
            ) : (
                <table className={styles['recent-payments-table']}>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Player</th>
                            <th>Date</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {latestPayments.map(({ playerId, payment }, index) => (
                            <tr key={`${playerId}-${payment.date}-${index}`}>
                                <td>{formattedCurrency(payment.amount)}</td>
                                <td>{playerLabel(players, playerId)}</td>
                                <td>{formattedDate(new Date(payment.date))}</td>
                                <td className={styles['recent-payments-note']}>
                                    {payment.note?.trim() ? payment.note : '—'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
