import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';

export function App() {
    return (
        <>
            <nav className={styles['admin-navbar']}>
                <NavLink
                    to="/create-meeting"
                    className={({ isActive }) => (isActive ? styles.active : undefined)}
                >
                    Create Meeting
                </NavLink>
                <NavLink
                    to="/add-fee"
                    className={({ isActive }) => (isActive ? styles.active : undefined)}
                >
                    Add Fee
                </NavLink>
                <NavLink
                    to="/add-withdrawal"
                    className={({ isActive }) => (isActive ? styles.active : undefined)}
                >
                    Add Withdrawal
                </NavLink>
                <NavLink
                    to="/manage-settings"
                    className={({ isActive }) => (isActive ? styles.active : undefined)}
                >
                    Manage Settings
                </NavLink>
            </nav>
            <main className={styles['admin-main']}>
                <Routes>
                    <Route path="/create-meeting" element={<CreateMeetingPage />} />
                    <Route path="/add-fee" element={<AddFeePage />} />
                    <Route path="/add-withdrawal" element={<AddWithdrawalPage />} />
                    <Route path="/manage-settings" element={<ManageSettingsPage />} />
                    <Route path="*" element={<CreateMeetingPage />} />
                </Routes>
            </main>
        </>
    );
}

function CreateMeetingPage() {
    return <div className={styles['admin-card']}>Create New Meeting (Page)</div>;
}

function AddFeePage() {
    return <div className={styles['admin-card']}>Add Fee (Page)</div>;
}

function AddWithdrawalPage() {
    return <div className={styles['admin-card']}>Add Withdrawal (Page)</div>;
}

function ManageSettingsPage() {
    return <div className={styles['admin-card']}>Manage Settings (Page)</div>;
}
