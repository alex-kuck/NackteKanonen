import React from "react";
import { Bold, CrossedOut } from "../styled_components";

export const Rules: React.FC = () => (
    <>
        <h2>Regularien</h2>
        <div style={ { textAlign: 'center' } }>
            <h3>§ 1</h3>
            <span>Der Mitgliedsbeitrag pro Kegeln beträgt <CrossedOut>(5,00 € bis 06.04.2016)</CrossedOut> 10,00 €</span>
            <h3>§ 2</h3>
            <span>Ein Glöckchen führt nicht zu einer Wiederholung des Wurfes.</span>
            <h3>§ 3</h3>
            <span>Zum Erlaufen einer Kugel:</span>
            <ul>
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
            <h3>§ 4</h3>
            <span>Jeder Gastkegler muss im Laufe des Kegelabends das Spiel 10er-Drehen gespielt haben.</span>
            <h3>§ 5</h3>
            <span>Die jährliche Kegelfahrt wird von zwei ausgewählten Personen organisiert. Die anderen Kegelbrüder haben den Anweisungen dieser erwählten Personen im Laufe der Kegelfahrt Folge zu leisten. Zielort sowie Programm vor Ort müssen nicht bekannt sein.</span>
            <h3>§ 6</h3>
            <span>Das T-Shirt bzw. der Pullover des Kegelclubs ist zu <Bold>jedem</Bold> Kegeln anzuziehen. Nichtbeachtung wird mit 5,00 € bestraft.</span>
            <h3>§ 7</h3>
            <span>Mitglieder erhalten, wenn sie nicht zum Kegeln erscheinen, eine Pauschalstrafe von 5,00 €. Diese ist unabhängig von Strafen für fehlende Abmeldung o.ä.</span>
            <h3>§ 8</h3>
            <span>Für jedes Mitglied ist die Teilnahme am <a
                href="https://www.kicktipp.de/nacktekanonenbuli/"
                target={ '_blank' }>Kicktipp-Spiel</a> verpflichtend.</span>
            <h3>§ 9</h3>
            <span>Wer beim Trinkspiel Fingern seinen Finger wieder auf das Glas legt, obwohl er richtig getippt hat, zeigt offensichtlich so großes Interesse am Spiel, dass er weiterspielen muss.</span>
            <h3>§ 10</h3>
            <span>Verspätungen müssen bis spätestens 1h vor Kegelbeginn angekündigt werden.</span>
        </div>
    </>
);