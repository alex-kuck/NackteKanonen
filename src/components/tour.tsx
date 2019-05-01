import React from "react";
import {useCountdown} from "../utils";
import {Link} from "react-router-dom";
import {Bold, TextCentered} from "../styled_components";

export const TourLink: React.FC = () => {
    const countDown = useCountdown(Date.UTC(2019, 4, 1, 12, 0, 0));

    return (
        <Link to={'/tour'}>
            NK Tour '19<br/>
            <span style={{fontSize: '.8rem'}}>{countDown}</span>
        </Link>
    );
};

export const Tour: React.FC = () => {
    const nextHint = Date.UTC(2019, 3, 29, 19, 0, 0);
    const countDown = useCountdown(nextHint);
    return (
        <>
            <h1>Tour '19</h1>
            <h2>Nächste Informationen in:</h2>
            <TextCentered><h2 style={{fontSize: '2rem'}}>{countDown}</h2></TextCentered>
            <ol className={'tourHints'}>
                <li>
                    In euren Umschlägen habt ihr einen ersten Hinweis auf das Programm der
                    diesjährigen Kegeltour bekommen.
                    Dort werdet ihr alle in <Bold>neue Rollen</Bold> schlüpfen - und wie ginge das
                    besser,
                    als mit den entsprechenden <Bold>Outfits</Bold>?
                    Fangt also mit euren Besorgungen an, damit ihr nicht am Ende mit
                    heruntergelassener oder sogar ohne Hose dasteht.
                    <br/>
                    Außerdem muss jeder von euch <Bold>seinen Teil</Bold> dazu beitragen, damit ihr
                    das
                    diesjährige Reiseziel erreicht. Wenn ihr - und eure Navis -
                    nicht nur <Bold>???</Bold> sehen wollt, ist es wichtig, dass ihr euren Teil des
                    Rätsels gelöst zur Abreise mitbringt.
                    <br/><br/>
                    <span style={{
                        fontStyle: 'italic',
                        fontSize: '.8rem'
                    }}><Bold>Extra-Tipp:</Bold>&nbsp;
                        Benutzt zu Hause etwas Kleber, wenn ihr uns nicht auf den Leim gehen und schon am Start kleben bleiben wollt.
                    </span>
                </li>
                <li>
                    <span>Ich packe meinen Koffer...</span>
                    <ul>
                        <li>ausreichend Klamotten für warmes und kaltes Wetter</li>
                        <li>NK Pulli &amp; T-Shirt</li>
                        <li>Outdoorkleidung die dreckig werden darf (inkl. Schuhe)</li>
                        <li>Badesachen</li>
                        <li>Badetuch</li>
                        <li>Kleidung für deine Rolle (siehe Umschlag)</li>
                        <li>dein Puzzle (fertig mitbringen zum Treffpunkt)</li>
                        <li>Taschengeld ( wir versuchen wie bei vorherigen Touren das meiste zu
                            organisieren, jedoch kann es sein, dass ihr z. B. in Bars, Kasinos oder
                            auf dem Strip selber zahlen müsst)
                        </li>
                        <li>Personalausweis/ Reisepass</li>
                        <li>Krankenversicherungskarte</li>
                        <li>EC- und/ oder Kreditkarte</li>
                        <li>eine kleine Reiseapotheke (z.B. Sonnencreme, etwas gegen Kopfschmerzen
                            hat auch noch nie geschadet)
                        </li>
                    </ul>
                    <br/>
                    <span>Wer hat auch gerne:</span>
                    <ul>
                        <li>GoPro</li>
                        <li>Utensilien für Beerpong</li>
                        <li>Bälle jeglicher Art (Fußball, Football, etc.)</li>
                    </ul>
                </li>
                <li>
                    <span>Fakten, Fakten, Fakten:</span>
                    <ul>
                        <li>11,3 Mio.</li>
                        <li>30.688</li>
                        <li>Immaterielles Weltkulturerbe</li>
                        <li>47 Glocken</li>
                    </ul>
                </li>
                {nextHint < Date.now() &&
                    <li><br/>
                        <iframe width="80%" height="315"
                                src="https://www.youtube.com/embed/9jK-NcRmVcw" frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                    </li>
                }
            </ol>
        </>
    );
};