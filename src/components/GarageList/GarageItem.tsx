import { FC } from 'react';
import {
    IGarageEntry,
    deleteCarFetch,
} from '../../store/features/garage/garageSlice';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';

const GarageItem: FC<IGarageEntry> = ({ name, color, id, loading }) => {
    const dispatch = useAppDispatch();

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <button
                onClick={() => {
                    dispatch(deleteCarFetch(id));
                }}
            >
                Delete
            </button>
            <h1>{name}</h1>
            <p>{color}</p>
        </div>
    );
};

export default GarageItem;
