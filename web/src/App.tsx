import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import {DataWrapper, PlayersContainer} from "./containers";
import {Statutes, Tour} from "./components";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav className={'navbar'}>
                        <ul>
                            <li className={'brand'}>
                                <Link to={'/'}>Nackte Kanonen</Link>
                            </li>
                            <li className={'navLink'}>
                                <Link to={'/statutes'}>Statuten</Link>
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
                            <Route path={'/'} element={<PlayersContainer/>}/>
                            <Route path={'/statutes'} element={<Statutes/>}/>
                            <Route path={'/tour'} element={<Tour/>}/>
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
