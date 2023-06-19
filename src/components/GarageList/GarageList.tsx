import { FC, useCallback } from 'react';
import Pagination from '../Pagination/Pagination';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import GarageItem from './GarageItem';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import {
    getGarageFetch,
    setPage,
} from '../../store/features/garage/garageSlice';

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
    const setPageDispatch = useCallback(
        (page: number) => {
            dispatch(setPage(page));
        },
        [dispatch]
    );

    return (
        <Pagination
            getEntriesFetch={getGarageFetchDispatch}
            setPage={setPageDispatch}
            loading={loading}
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
        >
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <GarageItem key={item.id} {...item} />
                    </li>
                ))}
            </ul>
        </Pagination>
    );
};

export default GarageList;
