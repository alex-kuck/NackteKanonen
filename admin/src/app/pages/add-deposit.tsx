import { addDeposit, useFirebase } from '@shared/db';
import { isEmpty } from 'lodash';
import React from 'react';
import styles from '../app.module.css';
import { PaymentForm } from './payment-form';
import { playersWithIds } from './players-with-ids';
import { RecentPayments } from './recent-payments';

export function AddDepositPage() {
    const { players, deposits } = useFirebase();

    return (
        <div className={styles['admin-main-centered']}>
            <div className={styles['admin-card-full']}>
                <h2 style={{ textAlign: 'center' }}>Add Deposit</h2>
                {!isEmpty(players) && (
                    <PaymentForm players={playersWithIds(players)} onSubmit={addDeposit} />
                )}
                <RecentPayments
                    payments={deposits}
                    players={players}
                    title="5 most recent deposits"
                />
            </div>
        </div>
    );
}
