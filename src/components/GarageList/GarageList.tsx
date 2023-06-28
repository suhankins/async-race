import { FC, useCallback } from 'react';
import Pagination from '../Pagination/Pagination';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import GarageItem from './GarageItem/GarageItem';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import {
    getGarageFetch,
    setPage,
    startRace,
} from '../../store/features/garage/garageSlice';

const GarageList: FC = () => {
    const { cars, loading, currentPage, totalItems, itemsPerPage } =
        useAppSelector((state) => state.garage);
    const dispatch = useAppDispatch();

    const loadGarage = useCallback(() => {
        dispatch(getGarageFetch());
    }, [dispatch]);

    const handleSetPage = useCallback(
        (page: number) => {
            dispatch(setPage(page));
        },
        [dispatch]
    );

    return (
        <Pagination
            getEntries={loadGarage}
            handleSetPage={handleSetPage}
            loading={loading}
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
        >
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => dispatch(startRace())}
            >
                Start race!!!
            </button>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        <GarageItem {...car} />
                    </li>
                ))}
            </ul>
        </Pagination>
    );
};

export default GarageList;
