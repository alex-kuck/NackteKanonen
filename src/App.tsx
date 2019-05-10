import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';
import { DataWrapper, PlayersContainer } from "./containers";
import { Statutes, Tour, TourLink } from "./components";

class App extends Component {
    render() {
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
                        <div className="tour-link">
                            <TourLink />
                        </div>
                        <DataWrapper>
                            <Route path={'/'} exact component={PlayersContainer} />
                            <Route path={'/statutes'} component={Statutes} />
                            <Route path={'/tour'} component={Tour} />
                        </DataWrapper>
                    </main>
                    <footer>
                        <div>
                            <span>&copy; Alex Kucksdorf</span>
                            <span>{process.env.REACT_APP_VERSION}</span>
                        </div>
                    </footer>
                </div>
            </Router>
        );
    }
}

export default App;
