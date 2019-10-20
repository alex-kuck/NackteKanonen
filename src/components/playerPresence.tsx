import React from "react";
import { formattedNumber } from "../utils";

export const PlayerPresence: React.FC<{totalPresent: number, totalEvents: number}> = ({totalPresent, totalEvents}) => (
    <span>Anwesenheit: {`${totalPresent} / ${totalEvents}`} ({formattedNumber(totalPresent / totalEvents * 100)} %) <br/></span>
);