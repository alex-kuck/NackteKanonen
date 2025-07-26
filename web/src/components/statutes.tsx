import React from "react";
import {Penalties} from "./penalties";
import {Rules} from "./rules";

export const Statutes = () => (
    <div style={{
        maxWidth: 700,
        margin: "40px auto",
        background: "var(--card-bg)",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "32px 24px",
        fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
    }}>
        <h1 style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "2.2rem",
            marginBottom: 32,
            color: "var(--accent)",
            letterSpacing: 1
        }}>Statuten</h1>
        <div style={{marginBottom: 40}}>
            <Penalties/>
        </div>
        <hr style={{border: "none", borderTop: `2px solid var(--accent)`, margin: "32px 0"}}/>
        <div>
            <Rules/>
        </div>
    </div>
);
