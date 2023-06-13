import { FC, useCallback } from 'react';
import Pagination from '../Pagination/Pagination';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import GarageItem from './GarageItem';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { getGarageFetch } from '../../store/features/garage/garageSlice';

const GarageList: FC = () => {
    const {
        cars: items,
        loading,
        currentPage,
        totalItems,
        itemsPerPage,
    } = useAppSelector((state) => state.garage);
    const dispatch = useAppDispatch();

    const getGarageFetchDispatch = useCallback(() => {
        dispatch(getGarageFetch());
    }, [dispatch]);

    return (
        <Pagination
            getGarageFetch={getGarageFetchDispatch}
            items={items}
            loading={loading}
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            renderItem={GarageItem}
        />
    );
};

export default GarageList;
