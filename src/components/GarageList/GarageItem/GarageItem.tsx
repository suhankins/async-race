import { FC } from 'react';
import {
    IGarageEntry,
    deleteCarFetch,
    resetCar,
    startEngineFetch,
    updateCarFetch,
} from '../../../store/features/garage/garageSlice';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch';
import { OpenPaletteButton } from '../../OpenPaletteButton/OpenPaletteButton';
import styles from './GarageItem.module.scss';
import { CarIcon } from '../../CarIcon/CarIcon';
import { FlagIcon } from '../../FlagIcon/FlagIcon';

const GarageItem: FC<IGarageEntry> = ({
    name,
    color,
    id,
    loading,
    isEngineStarted,
    velocity,
    distance,
}) => {
    const dispatch = useAppDispatch();

    if (loading) return <p>Loading...</p>;

    const isAtStart = distance === 0;

    const calculatedStyles: React.CSSProperties = {
        animation: `${distance / velocity}ms linear 0s 1 normal ${
            isAtStart ? '' : 'forwards'
        } ${isEngineStarted ? 'running' : 'paused'} ${
            isAtStart ? '' : styles.slide
        }`,
    };

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
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        dispatch(startEngineFetch(id));
                    }}
                >
                    Start
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => dispatch(resetCar(id))}
                >
                    Stop
                </button>
                <div className={styles.raceTrack}>
                    <div className={styles.carContainer}>
                        <CarIcon
                            color={color}
                            className={styles.car}
                            style={calculatedStyles}
                        />
                    </div>
                    <FlagIcon className={styles.flag} />
                </div>
            </div>
        </div>
    );
};

export default GarageItem;
