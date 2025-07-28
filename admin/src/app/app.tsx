// Uncomment this line to use CSS modules
import { migrateMeetings, migratePayments } from '../../../shared/src/lib/models/migrations/v1v2';

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
        </div>
    );
}

export default App;
