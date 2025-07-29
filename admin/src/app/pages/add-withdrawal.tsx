import { addWithdrawal, useFirebase } from '@shared/db';
import { isEmpty } from 'lodash';
import React from 'react';
import styles from '../app.module.css';
import { PaymentForm } from './payment-form';
import { playersWithIds } from './players-with-ids';

export function AddWithdrawalPage() {
    const { players } = useFirebase();

    return (
        <div className={styles['admin-main-centered']}>
            <div className={styles['admin-card-full']}>
                <h2 style={{ textAlign: 'center' }}>Add Withdrawal</h2>
                {!isEmpty(players) && (
                    <PaymentForm players={playersWithIds(players)} onSubmit={addWithdrawal} />
                )}
            </div>
        </div>
    );
}
