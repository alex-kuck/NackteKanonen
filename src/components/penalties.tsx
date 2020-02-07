import React, { ReactNode } from "react";
import { formattedCurrency } from "../utils";

export interface IPenalty {
    offense: string,
    penalty: string | ReactNode
}

export const Penalties: React.FC = () => {
    const penalties: IPenalty[] = [
        { offense: 'Pudel', penalty: formattedCurrency(.25) },
        { offense: 'Glöckchen', penalty: formattedCurrency(.5) },
        { offense: 'Kugel gebracht bekommen', penalty: formattedCurrency(.5) },
        {
            offense: 'Offensichtlich warnen, dass jemand dran ist',
            penalty: `${formattedCurrency(0.5)} für Warnenden und Werfer`
        },
        { offense: 'Fehlwurf', penalty: formattedCurrency(1) },
        {
            offense: 'Erfolgreich Kugel erlaufen',
            penalty: `${formattedCurrency(1)} für Werfer & Wurf wird schlechtestmöglich gewertet`
        },
        { offense: 'Gescheiterter Lauf', penalty: `${formattedCurrency(1)} für den Läufer` },
        { offense: 'Fernbleiben ohne Entschuldigung', penalty: formattedCurrency(15) },
        {
            offense: 'Zu spät ohne Benachrichtigung',
            penalty:
                <td>
                    {formattedCurrency(5)} bis 15 Minuten<br />
                    {formattedCurrency(10)} bis 30 Minuten<br />
                    {formattedCurrency(15)} danach
            </td>
        },
        { offense: 'Verlust des Kegelpins', penalty: formattedCurrency(10) },
        { offense: 'Beim Ausspielen des Kegelkönigs auch im 6. Wurf nicht abräumen', penalty: formattedCurrency(1) },
    ];

    return (
        <>
            <h2>Strafen</h2>
            <table>
                <thead>
                    <tr>
                        <th>Vergehen</th>
                        <th>Strafe</th>
                    </tr>
                </thead>
                <tbody>
                    {penalties.map(({ offense, penalty }, index) =>
                        <tr key={`penalties-${index}`}>
                            <td>{offense}</td>
                            <td>{penalty}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};