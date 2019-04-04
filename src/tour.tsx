import React from "react";
import {useCountdown} from "./utils";
import {Link} from "react-router-dom";
import {Bold, TextCentered} from "./styled_components";

export const TourLink: React.FC = () => {
    const countDown = useCountdown(Date.UTC(2019, 4, 1, 13, 0, 0));

    return (
        <Link to={'/tour'}>
            NK Tour '19<br/>
            <span style={{fontSize: '.8rem'}}>{countDown}</span>
        </Link>
    );
};

export const Tour: React.FC = () => {
    const firstHint = Date.UTC(2019, 2, 30, 19, 0, 0);
    const secondHint = Date.UTC(2019, 3, 7, 19, 0, 0);
    const countDown = useCountdown(firstHint);
    return (
        <>
            <h1>Tour '19</h1>
            <h2>Nächste Informationen in:</h2>
            <TextCentered><h2 style={{fontSize: '2rem'}}>{countDown}</h2></TextCentered>
            <ol style={{display: 'flex', flexDirection: 'column-reverse'}}>
                {firstHint < Date.now() &&
                <li>
                    In euren Umschlägen habt ihr einen ersten Hinweis auf das Programm der
                    diesjährigen Kegeltour bekommen.
                    Dort werdet ihr alle in <Bold>neue Rollen</Bold> schlüpfen - und wie ginge das besser,
                    als mit den entsprechenden <Bold>Outfits</Bold>?
                    Fangt also mit euren Besorgungen an, damit ihr nicht am Ende mit
                    heruntergelassener oder sogar ohne Hose dasteht.
                    <br/>
                    Außerdem muss jeder von euch <Bold>seinen Teil</Bold> dazu beitragen, damit ihr das
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
                }
                {secondHint < Date.now() && <li>

                </li>}
            </ol>
        </>
    );
};