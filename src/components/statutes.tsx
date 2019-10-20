import React from "react";
import { Penalties } from "./penalties";
import { Rules } from "./rules";

export const Statutes: React.FC = () => (
    <div>
        <h1>Statuten</h1>
        <Penalties/>
        <Rules/>
    </div>
);