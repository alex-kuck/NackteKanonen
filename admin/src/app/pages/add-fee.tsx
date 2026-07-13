import { addFee, useFirebase } from '@shared/db';
import { isEmpty } from 'lodash';
import React from 'react';
import styles from '../app.module.css';
import { PaymentForm } from './payment-form';
import { playersWithIds } from './players-with-ids';
import { RecentPayments } from './recent-payments';

export function AddFeePage() {
    const { players, fees } = useFirebase();

    return (
        <div className={styles['admin-main-centered']}>
            <div className={styles['admin-card-full']}>
                <h2 style={{ textAlign: 'center' }}>Add Fee</h2>
                {!isEmpty(players) && (
                    <PaymentForm players={playersWithIds(players)} onSubmit={addFee} />
                )}
                <RecentPayments payments={fees} players={players} title="5 most recent fees" />
            </div>
        </div>
    );
}
