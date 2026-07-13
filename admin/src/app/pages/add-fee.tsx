import { addFee, useFirebase } from '@shared/db';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import styles from '../app.module.css';
import { AddFeeForm } from './add-fee-form';
import { PaymentForm } from './payment-form';
import { playersWithIds } from './players-with-ids';
import { RecentPayments } from './recent-payments';

export function AddFeePage() {
    const { players, fees } = useFirebase();
    const [mode, setMode] = useState<'single' | 'multi'>('single');
    const playersWithId = playersWithIds(players);

    return (
        <div className={styles['admin-main-centered']}>
            <div className={styles['admin-card-full']}>
                <h2 style={{ textAlign: 'center' }}>Add Fee</h2>
                {!isEmpty(players) && (
                    <>
                        <div className={styles['mode-tabs']}>
                            <button
                                type="button"
                                className={`${styles['mode-tab']} ${
                                    mode === 'single' ? styles['mode-tab-active'] : ''
                                }`}
                                onClick={() => setMode('single')}
                            >
                                Single player
                            </button>
                            <button
                                type="button"
                                className={`${styles['mode-tab']} ${
                                    mode === 'multi' ? styles['mode-tab-active'] : ''
                                }`}
                                onClick={() => setMode('multi')}
                            >
                                Multiple players
                            </button>
                        </div>
                        {mode === 'single' ? (
                            <PaymentForm players={playersWithId} onSubmit={addFee} />
                        ) : (
                            <AddFeeForm players={playersWithId} />
                        )}
                    </>
                )}
                <RecentPayments payments={fees} players={players} title="5 most recent fees" />
            </div>
        </div>
    );
}
