import {formattedNumber} from "@shared/formatting";
import React from "react";

interface PlayerPresenceProps {
    totalPresent: number;
    totalEvents: number;
}

export const PlayerPresence = ({ totalPresent, totalEvents }: PlayerPresenceProps) => (
    <span>Anwesenheit: {`${totalPresent} / ${totalEvents}`} ({formattedNumber(totalPresent / totalEvents * 100)} %) <br/></span>
);
