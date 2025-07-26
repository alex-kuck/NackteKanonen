import React from "react";
import { formattedNumber } from "../utils";

interface PlayerPresenceProps {
    totalPresent: number;
    totalEvents: number;
}

export const PlayerPresence = ({ totalPresent, totalEvents }: PlayerPresenceProps) => (
    <span>Anwesenheit: {`${totalPresent} / ${totalEvents}`} ({formattedNumber(totalPresent / totalEvents * 100)} %) <br/></span>
);
