import { v2 } from '@shared/db';
import { formattedCurrency, formattedDate } from '@shared/formatting';
import { maxBy, min, sum, values } from 'lodash';
import React from 'react';
import { useDataContext } from '../containers';
import { Bold, Logo, OverviewGrid } from '../styled_components';

export const Overview = () => {
    const { withdrawals, deposits, meetings, players } = useDataContext();

    const lastMeeting = maxBy(values(meetings), 'date');
    const totalWithdrawn = total(values(withdrawals));
    const totalDeposits = total(values(deposits));

    const open = sum(values(players).map((player) => min([0, v2.balance(player)])));

    return (
        <>
            <OverviewGrid>
                <div style={{ gridArea: 'info', textAlign: 'center', fontSize: 'x-large' }}>
                    <span>
                        Kassenstand:{' '}
                        <Bold>{formattedCurrency(totalDeposits - totalWithdrawn)}</Bold>
                        <br /> (letztes erfasstes Kegeln{' '}
                        {formattedDate(new Date(lastMeeting?.date ?? 0))})
                        <br />
                    </span>
                    <span>
                        Ausstehende Zahlungen: <Bold>{formattedCurrency(open * -1)}</Bold>
                    </span>
                </div>
                <div style={{ gridArea: 'logo' }}>
                    <Logo src={'/img/logo.jpg'} alt={'Nackte Kanonen Logo'} />
                </div>
            </OverviewGrid>
        </>
    );
};

const total = (payments: v2.Payments[]) =>
    payments.flatMap((it) => values(it)).reduce((acc, curr) => acc + curr.amount, 0);
