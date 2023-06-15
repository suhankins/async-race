import { FC } from 'react';
import GarageList from '../../components/GarageList/GarageList';
import { AddNewCar } from '../../components/AddNewCar/AddNewCar';

const Garage: FC = () => {
    return (
        <>
            <AddNewCar />
            <GarageList />
        </>
    );
};

export default Garage;
