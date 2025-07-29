// Uncomment this line to use CSS modules
import {
    migrateKasseKey,
    migrateMeetings,
    migratePayments,
} from '../../../shared/src/lib/models/migrations/v1v2';

// import styles from './app.module.css';

export function App() {
    return (
        <div>
            <button onClick={() => migratePayments()} type="button">
                Migrate Player Results to V2
            </button>

            <button onClick={() => migrateMeetings()} type="button">
                Create Meetings from Player Results
            </button>

            <button onClick={() => migrateKasseKey()} type="button">
                Migrate Kasse key
            </button>
        </div>
    );
}

export default App;
