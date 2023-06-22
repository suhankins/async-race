import { FC } from 'react';
import {
    IGarageEntry,
    deleteCarFetch,
    updateCarFetch,
} from '../../../store/features/garage/garageSlice';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch';
import { OpenPaletteButton } from '../../OpenPaletteButton/OpenPaletteButton';
import styles from './GarageItem.module.scss';
import { CarIcon } from '../../CarIcon/CarIcon';

const GarageItem: FC<IGarageEntry> = ({
    name,
    color,
    id,
    loading,
    position,
}) => {
    const dispatch = useAppDispatch();

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <button
                onClick={() => {
                    dispatch(deleteCarFetch(id));
                }}
                type="button"
            >
                Delete
            </button>
            <input
                defaultValue={name}
                placeholder="Car name"
                onBlur={(e) => {
                    dispatch(
                        updateCarFetch({ id, name: e.target.value, color })
                    );
                }}
            />
            <OpenPaletteButton
                defaultValue={color}
                updateColor={(value) => {
                    dispatch(updateCarFetch({ id, name, color: value }));
                }}
            />
            <div className={styles.raceTrackContainer}>
                <button type="button" className="btn btn-success">
                    Start
                </button>
                <button type="button" className="btn btn-danger">
                    Stop
                </button>
                <div className={styles.raceTrack}>
                    <CarIcon
                        color={color}
                        style={{
                            left: `${position}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default GarageItem;
