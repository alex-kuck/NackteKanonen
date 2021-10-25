import React from "react";
import {useCountdown} from "../utils";
import {Link} from "react-router-dom";
import {TextCentered} from "../styled_components";

export const TourLink: React.FC = () => {
    const countDown = useCountdown(Date.UTC(2019, 4, 1, 12, 0, 0));

    return (
        <Link to={'/tour'}>
            NK Tour (TBD)<br/>
            <span style={{fontSize: '.8rem'}}>{countDown}</span>
        </Link>
    );
};

export const Tour: React.FC = () => {
    const nextHint = Date.UTC(2023, 1, 1, 0, 0, 0);
    const countDown = useCountdown(nextHint);
    return (
        <>
            <h1>Tour '22</h1>
            <h2>Nächste Informationen in:</h2>
            <TextCentered><h2 style={{fontSize: '2rem'}}>{countDown}</h2></TextCentered>
        </>
    );
};