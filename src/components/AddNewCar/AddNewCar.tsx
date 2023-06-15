import { useRef, useState } from 'react';
import { OpenPaletteButton } from '../OpenPaletteButton/OpenPaletteButton';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { createCarFetch } from '../../store/features/garage/garageSlice';

export function AddNewCar() {
    const nameRef = useRef<HTMLInputElement>(null);
    const [color, setColor] = useState('#ff0000');

    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            createCarFetch({
                id: 0,
                name: nameRef.current!.value,
                color: color,
            })
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add New Car</h1>
            <input ref={nameRef} type="text" placeholder="Car Name" required />
            <OpenPaletteButton
                defaultValue={color}
                updateColor={(value) => setColor(value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}
