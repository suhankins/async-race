import ViewSwitch from './components/ViewSwitch/ViewSwitch';
import Garage from './views/Garage/Garage';
import Winners from './views/Winners/Winners';

function App() {
    return (
        <ViewSwitch
            views={[
                {
                    name: 'Garage',
                    component: <Garage />,
                },
                {
                    name: 'Winners',
                    component: <Winners />,
                },
            ]}
        />
    );
}

export default App;
