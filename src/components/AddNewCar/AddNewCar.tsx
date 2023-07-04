import { useCallback, useState } from 'react';
import { OpenPaletteButton } from '../OpenPaletteButton/OpenPaletteButton';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import {
    createCarFetch,
    generateRandomCars,
} from '../../store/features/garage/garageSlice';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import styles from './AddNewCar.module.scss';

export function AddNewCar() {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#ff0000');

    const { loading } = useAppSelector((state) => state.garage);

    const dispatch = useAppDispatch();

    const handleGenerate = useCallback(() => {
        dispatch(generateRandomCars(100));
    }, [dispatch]);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(
                createCarFetch({
                    id: 0,
                    name: name || 'New Car',
                    color: color,
                })
            );
        },
        [dispatch, name, color]
    );

    return (
        <div className={styles.addNewCar}>
            <h1>Add New Car</h1>
            <form onSubmit={handleSubmit} className={styles.addNewCarForm}>
                <input
                    disabled={loading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`form-control ${styles.size3}`}
                    type="text"
                    placeholder="Car Name"
                    required
                />
                <OpenPaletteButton
                    disabled={loading}
                    defaultValue={color}
                    updateColor={(value) => setColor(value)}
                />
                <button
                    type="submit"
                    className={`btn btn-primary ${styles.size1}`}
                    disabled={loading}
                >
                    Add
                </button>
            </form>
            <button
                type="button"
                onClick={handleGenerate}
                className="btn btn-secondary"
                disabled={loading}
            >
                Generate 100 random cars
            </button>
        </div>
    );
}
