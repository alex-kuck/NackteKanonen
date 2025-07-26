import React, {PropsWithChildren} from "react";
import {Bold, CrossedOut} from "../styled_components";

export const Rules = () => (
    <>
        <h2 style={{color: "var(--accent)", textAlign: 'center', fontWeight: 700, marginBottom: 20}}>Regularien</h2>
        <div style={{textAlign: 'center'}}>
            <Rule>§ 1</Rule>
            <span>Der Mitgliedsbeitrag pro Kegeln beträgt <CrossedOut>(5,00 € bis 06.04.2016)</CrossedOut> <CrossedOut>10,00 €</CrossedOut> 25,00€ (seit 10.08.2024)</span>
            <Rule>§ 2</Rule>
            <span>Ein Glöckchen führt nicht zu einer Wiederholung des Wurfes.</span>
            <Rule>§ 3</Rule>
            <span>Zum Erlaufen einer Kugel:</span>
            <ul style={listStyle}>
                <li>Das absichtliche Blocken von Läufern ist <Bold>nicht</Bold> erlaubt.</li>
                <li>Für einen gültigen Lauf muss der Läufer hinter dem Werfer befindlich sein, bis
                    die Kegelkugel die Hand des Werfers verlässt.
                </li>
                <li>Die Kugel gilt als erlaufen, wenn die Kugel derart beeinflusst wird – anhalten
                    oder ablenken –, sodass die Kugel <Bold>keinen</Bold> Kegel umstößt.
                </li>
                <li>Fallen bei halsbrecherischen Einlagen - wie Supergrätschen - Kegel durch den
                    Läufer, behält der Wurf seine Gültigkeit und der Lauf wird als Fehllauf
                    gewertet.
                </li>
            </ul>
            <Rule>§ 4</Rule>
            <span>Jeder Gastkegler muss im Laufe des Kegelabends das Spiel 10er-Drehen gespielt haben.</span>
            <Rule>§ 5</Rule>
            <span>Die jährliche Kegelfahrt wird von zwei ausgewählten Personen organisiert. Die anderen Kegelbrüder haben den Anweisungen dieser erwählten Personen im Laufe der Kegelfahrt Folge zu leisten. Zielort sowie Programm vor Ort müssen nicht bekannt sein.</span>
            <Rule>§ 6</Rule>
            <span>Das T-Shirt bzw. der Pullover des Kegelclubs ist zu <Bold>jedem</Bold> Kegeln anzuziehen. Nichtbeachtung wird mit 5,00 € bestraft.</span>
            <Rule>§ 7</Rule>
            <span>Mitglieder erhalten, wenn sie nicht zum Kegeln erscheinen, eine Pauschalstrafe von <CrossedOut>(5,00 € bis 10.08.2024)</CrossedOut> 10,00 €. Diese ist unabhängig von Strafen für fehlende Abmeldung o.ä.</span>
            <Rule>§ 8</Rule>
            <span>Für jedes Mitglied ist die Teilnahme am <a
                href="https://www.kicktipp.de/nacktekanonenbuli/"
                target='_blank'
                rel="noopener noreferrer">Kicktipp-Spiel</a> verpflichtend.</span>
            <Rule>§ 9</Rule>
            <span>Wer beim Trinkspiel Fingern seinen Finger wieder auf das Glas legt, obwohl er richtig getippt hat, zeigt offensichtlich so großes Interesse am Spiel, dass er weiterspielen muss.</span>
            <Rule>§ 10</Rule>
            <span>Verspätungen müssen bis spätestens 1h vor Kegelbeginn angekündigt werden.</span>
            <Rule>§ 11</Rule>
            <span>Jedes Mitglied des Kegelclubs hat einen metallenen Kegelpin. Dieser ist zu allen Zeiten mitzuführen.</span>
            <ol style={listStyle}>
                <li>Fordert ein Mitglied ein anderes auf seinen Pin zu präsentieren, muss dieser der
                    Aufforderung nachkommen. Wer seinen Pin nicht dabei hat, muss dem
                    anderen ein Getränk ausgeben. Kann der aufgeforderte Kegler seinen Pin
                    vorweisen, erhält er für seine Mühe ein Getränk vom Fragenden.
                </li>
                <li>Fordert ein Mitglied eine Gruppe von Keglern auf ihre Pins vorzuzeigen, gilt
                    folgendes: Haben alle Kegler ihren Pin dabei, muss der Fragende allen
                    anwesenden Keglern ein Getränk ausgeben (eine Runde). Wenn min. 1 Kegler der
                    Aufforderung <Bold>nicht</Bold> nachkommen kann, müssen alle den
                    anderen Keglern eine Runde ausgeben.
                </li>
            </ol>
            <Rule>§ 12</Rule>
            <span>Königsspiel</span>
            <ol style={listStyle}>
                <li>Es wird eine komplette Reihe gespielt
                </li>
                <li>Die Differenz zum Kegelkönig werden als Strafe in € fällig.
                </li>
            </ol>
        </div>
    </>
);

const listStyle = {
    textAlign: 'left',
    margin: '16px auto',
    padding: '16px 32px',
    background: 'var(--card-bg)',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    border: `1px solid ${"var(--accent)"}`,
    maxWidth: 500,
    color: 'var(--card-fg)',
    fontSize: '1rem',
    lineHeight: 1.6
} as const

const Rule = ({children}: PropsWithChildren) => (
    <h3 style={{color: "var(--accent)", marginTop: 24}}>{children}</h3>
)
