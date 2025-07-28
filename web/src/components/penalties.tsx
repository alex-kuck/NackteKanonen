import { formattedCurrency } from "@shared/formatting";
import React, {ReactNode} from "react";

export interface IPenalty {
    offense: string,
    penalty: string | ReactNode
}

export const Penalties = () => {
    const penalties: IPenalty[] = [
        {offense: 'Pudel', penalty: formattedCurrency(.25)},
        {offense: 'Glöckchen', penalty: formattedCurrency(.5)},
        {offense: 'Kugel gebracht bekommen', penalty: formattedCurrency(.5)},
        {
            offense: 'Offensichtlich warnen, dass jemand dran ist',
            penalty: `${formattedCurrency(0.5)} für Warnenden und Werfer`
        },
        {offense: 'Fehlwurf', penalty: formattedCurrency(1)},
        {
            offense: 'Erfolgreich Kugel erlaufen',
            penalty: `${formattedCurrency(1)} für Werfer & Wurf wird schlechtestmöglich gewertet`
        },
        {offense: 'Gescheiterter Lauf', penalty: `${formattedCurrency(1)} für den Läufer`},
        {offense: 'Fernbleiben ohne Entschuldigung', penalty: formattedCurrency(15)},
        {
            offense: 'Zu spät ohne Benachrichtigung',
            penalty:
                <>
                    {formattedCurrency(5)} bis 15 Minuten<br/>
                    {formattedCurrency(10)} bis 30 Minuten<br/>
                    {formattedCurrency(15)} danach
                </>
        },
        {offense: 'Verlust des Kegelpins', penalty: formattedCurrency(10)},
        {
            offense: 'Beim Ausspielen des Kegelkönigs auch im 6. Wurf nicht abräumen',
            penalty: formattedCurrency(1)
        },
        {offense: 'Ein Wasser bestellen', penalty: formattedCurrency(0.25)}
    ];

    return (
        <>
            <h2 style={{ color: "var(--accent)", textAlign: 'center', fontWeight: 700, marginBottom: 20 }}>Strafen</h2>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: '#fafafa',
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
                <thead>
                <tr style={{ background: "var(--accent)", color: '#fff' }}>
                    <th style={{ padding: '12px 8px', fontWeight: 600, fontSize: '1rem', border: 'none' }}>Vergehen</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600, fontSize: '1rem', border: 'none' }}>Strafe</th>
                </tr>
                </thead>
                <tbody>
                {penalties.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '10px 8px', color: "var(--accent)", fontWeight: 500 }}>{p.offense}</td>
                        <td style={{ padding: '10px 8px' }}>{p.penalty}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
