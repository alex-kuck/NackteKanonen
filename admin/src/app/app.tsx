import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import { AddDepositPage } from './pages/add-deposit';
import { AddFeePage } from './pages/add-fee';
import { AddWithdrawalPage } from './pages/add-withdrawal';
import { CreateMeetingPage } from './pages/create-meeting';
import { ManageSettingsPage } from './pages/manage-settings';
import { ThemeProvider, ThemeToggleButton } from './theme';

const navigation = [
    { to: '/create-meeting', label: 'Neues Kegeln' },
    { to: '/add-deposit', label: 'Add Deposit' },
    { to: '/add-fee', label: 'Add Fee' },
    { to: '/add-withdrawal', label: 'Add Withdrawal' },
    { to: '/manage-settings', label: 'Manage Settings' },
];

export function App() {
    return (
        <ThemeProvider>
            <nav className={styles['admin-navbar']}>
                {navigation.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => (isActive ? styles.active : undefined)}
                    >
                        {label}
                    </NavLink>
                ))}
                <ThemeToggleButton />
            </nav>
            <main className={styles['admin-main']}>
                <Routes>
                    <Route path="/create-meeting" element={<CreateMeetingPage />} />
                    <Route path="/add-deposit" element={<AddDepositPage />} />
                    <Route path="/add-fee" element={<AddFeePage />} />
                    <Route path="/add-withdrawal" element={<AddWithdrawalPage />} />
                    <Route path="/manage-settings" element={<ManageSettingsPage />} />
                    <Route path="*" element={<CreateMeetingPage />} />
                </Routes>
            </main>
        </ThemeProvider>
    );
}
