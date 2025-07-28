import {formattedCurrency, formattedDateFromSeconds} from "@shared/formatting";
import React from "react";
import {useDataContext} from "../containers";
import {Bold, Logo, OverviewGrid} from "../styled_components";

export const Overview = () => {
    const {playerResults} = useDataContext();
    const info = Object.values(playerResults).reduce((acc, {
        deposit, fee, guestFee, memberFee, poodleFee, bellFee, date
    }) => ({
        total: acc.total + deposit,
        theoretical: acc.theoretical + fee + guestFee + memberFee + poodleFee + bellFee + (deposit < 0 ? deposit : 0),
        updatedAt: Math.max(acc.updatedAt, date)
    }), {total: 0, theoretical: 0, updatedAt: 0});

    return (
        <>
            <OverviewGrid>
                <div style={{gridArea: 'info', textAlign: 'center', fontSize: 'x-large'}}>
                    <span>
                            Kassenstand: <Bold>{formattedCurrency(info.total)}</Bold> (vom {formattedDateFromSeconds(info.updatedAt)})
                    </span><br/>
                    <span>Mit ausstehenden Zahlungen: <Bold>{formattedCurrency(info.theoretical)}</Bold></span>
                </div>
                <div style={{gridArea: 'logo'}}>
                    <Logo src={'/img/logo.jpg'} alt={'Nackte Kanonen Logo'}/>
                </div>
            </OverviewGrid>
        </>
    );
};
