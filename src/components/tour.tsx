import React from "react";
import { useCountdown } from "../utils";
import { Link } from "react-router-dom";
import { TextCentered } from "../styled_components";
import { YoutubeVideo } from "./youtubeVideo";

export const TourLink: React.FC = () => {
    const nextHint = Date.UTC(2020, 5, 4, 17, 0, 0);
    const countDown = useCountdown(nextHint);

    return (
        <Link to={ '/tour' }>
            NK Tour '20<br/>
            <span style={ { fontSize: '.8rem' } }>{ countDown }</span>
        </Link>
    );
};

export const Tour: React.FC = () => {
    const nextHint = Date.UTC(2020, 2, 22, 19, 0, 0);
    const countDown = useCountdown(nextHint);
    return (
        <>
            <h1>Tour 2020</h1>
            <h2>Nächste Informationen in:</h2>
            <TextCentered><h2 style={ { fontSize: '2rem' } }>{ countDown }</h2></TextCentered>
            <ol className={ 'tourHints' }>
                <li>
                    Die Anreise zur Kegeltour erfolgt bereits am Abend des 04.06.2020 (Donnerstag).
                </li>
                { Date.now() > nextHint && <li>Diese Videos sind nur für die Kegelbrüder der Nackten Kanonen bestimmt! Bitte gebt den Link nicht weiter!<br/><br/>
                    Bald ist es so weit... Wir füttern euch mit losen und sinnlosen, reichen und hilfreichen Hinweisen für die angehende Kegeltour. 
                    Freut euch auf ein reiches und glorreiches Gelage..<br/><br/>
                    { <YoutubeVideo title="Erster Hinweis"
                                    url="https://www.youtube.com/embed/Ce3V39z0qXk"/> }
                </li> }
            </ol>
        </>
    );
};
