import { useCallback, useState } from 'react';
import { OpenPaletteButton } from '../OpenPaletteButton/OpenPaletteButton';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import {
    createCarFetch,
    generateRandomCars,
} from '../../store/features/garage/garageSlice';
import { useAppSelector } from '../../store/hooks/useAppSelector';

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

    if (loading) {
        return <p>TODO: Skeleton?</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add New Car</h1>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Car Name"
                required
            />
            <OpenPaletteButton
                defaultValue={color}
                updateColor={(value) => setColor(value)}
            />
            <button type="submit">Add</button>
            <button type="button" onClick={handleGenerate}>
                Generate 100 random cars
            </button>
        </form>
    );
}
