import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import './App.css';
import {Statutes, Tour} from "./components";
import {useTheme} from './components/ThemeProvider';
import {DataWrapper, PlayersContainer} from "./containers";

function SunIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
        </svg>
    );
}

function App() {
    const {theme, setTheme} = useTheme();
    const isDark = theme === 'dark';
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav className='navbar'>
                        <ul>
                            <li className='brand'>
                                <Link to='/'>Nackte Kanonen</Link>
                            </li>
                            <li className='navLink'>
                                <Link to='/statutes'>Statuten</Link>
                            </li>
                            <li className='theme-toggle-li'>
                                <button
                                    className="theme-toggle"
                                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                                    onClick={() => setTheme(isDark ? 'light' : 'dark')}
                                >
                                    {isDark ? <SunIcon/> : <MoonIcon/>}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    {/*<div className="tour-link">*/}
                    {/*    <TourLink/>*/}
                    {/*</div>*/}
                    <DataWrapper>
                        <Routes>
                            <Route path='/' element={<PlayersContainer/>}/>
                            <Route path='/statutes' element={<Statutes/>}/>
                            <Route path='/tour' element={<Tour/>}/>
                        </Routes>
                    </DataWrapper>
                </main>
                <footer>
                    <div>
                        <span>&copy; Alex Kucksdorf</span>
                        <span>{import.meta.env.VITE_VERSION}</span>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
