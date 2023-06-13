import { FC, useState } from 'react';
import GarageList from '../../components/GarageList';

const Garage: FC = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            <GarageList />
        </>
    );
};

export default Garage;
