import './App.css';
import ViewSwitch from './components/ViewSwitch';
import Garage from './views/Garage';
import { Winners } from './views/Winners';

function App() {
    return (
        <ViewSwitch
            views={[
                {
                    name: 'Garage',
                    component: Garage,
                },
                {
                    name: 'Winners',
                    component: Winners,
                },
            ]}
        />
    );
}

export default App;
