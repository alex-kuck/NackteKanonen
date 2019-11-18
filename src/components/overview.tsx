import React, { useContext } from "react";
import { DataContext } from "../containers";
import { OverviewGrid, Bold, Logo, Link } from "../styled_components";
import { formattedCurrency } from "../utils";

export const Overview: React.FC = () => {
    const { playerResults } = useContext(DataContext);
    const info = Object.values(playerResults).reduce((acc, { deposit, fee, guestFee, memberFee, poodleFee, bellFee }) => ({
        total: acc.total + deposit,
        theoretical: acc.theoretical + fee + guestFee + memberFee + poodleFee + bellFee + (deposit < 0 ? deposit : 0)
    }), { total: 0, theoretical: 0 });

    return (
        <>
            <OverviewGrid>
                <div style={{ gridArea: 'info', textAlign: 'center', fontSize: 'x-large' }}>
                    <span>
                        <Link href='https://paypal.me/pools/c/87VSw13aSa'>
                            Kassenstand: <Bold>{formattedCurrency(info.total)}</Bold>
                        </Link>
                    </span><br />
                    <span>Mit ausstehenden Zahlungen: <Bold>{formattedCurrency(info.theoretical)}</Bold></span>
                </div>
                <div style={{ gridArea: 'logo' }}>
                    <Logo src={'/img/logo.jpg'} alt={'Nackte Kanonen Logo'} />
                </div>
            </OverviewGrid>
        </>
    );
};