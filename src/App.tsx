import React, {Component, useContext} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './App.css';
import {DataContext, DataWrapper, PlayerContainer} from "./containers";
import {formattedCurrency} from "./utils";
import {Bold, Logo, OverviewGrid} from "./styled_components";
import {Statutes} from "./statutes";
import {Tour, TourLink} from "./tour";

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
                            <Route path={'/'} exact component={PlayerContainer}/>
                            <Route path={'/statutes'} component={Statutes}/>
                            <Route path={'/tour'} component={Tour}/>
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

export const Overview: React.FC = () => {
        const {playerResults} = useContext(DataContext);
        const info = Object.values(playerResults).reduce((acc, {deposit, fee, guestFee, memberFee, poodleFee, bellFee}) => ({
            total: acc.total + deposit,
            theoretical: acc.theoretical + fee + guestFee + memberFee + poodleFee + bellFee + (deposit < 0 ? deposit : 0)
        }), {total: 0, theoretical: 0});

        return (
            <>
                <OverviewGrid>
                    <div style={{gridArea: 'info', textAlign: 'center', fontSize: 'x-large'}}>
                        <span>Kassenstand: <Bold>{formattedCurrency(info.total)}</Bold></span><br/>
                        <span>Mit ausstehenden Zahlungen: <Bold>{formattedCurrency(info.theoretical)}</Bold></span>
                    </div>
                    <div style={{gridArea: 'logo'}}>
                        <Logo src={'/img/logo.jpg'} alt={'Nackte Kanonen Logo'}/>
                    </div>
                </OverviewGrid>
            </>
        );
    }
;

export default App;
