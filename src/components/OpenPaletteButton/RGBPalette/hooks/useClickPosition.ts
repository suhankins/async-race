import { RefObject, useEffect, useState } from 'react';

function normalize(value: number) {
    if (value < 0) return 0;
    if (value > 1) return 1;
    return value;
}

function getMousePosition(e: MouseEvent, ref: RefObject<HTMLDivElement>) {
    if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        let x = normalize((e.clientX - rect.left) / rect.width);
        let y = normalize((e.clientY - rect.top) / rect.height);

        return { x, y };
    }
    return { x: 0, y: 0 };
}

/**
 * Returns the position of the mouse relative to given element.
 */
export function useClickPosition(
    ref: RefObject<HTMLDivElement>,
    defaultPosition = { x: 0, y: 0 }
) {
    const [position, setPosition] = useState(defaultPosition);
    useEffect(() => {
        let mouseDown = false;
        const handleMouseDown = (e: MouseEvent) => {
            if (ref.current) {
                mouseDown = true;
                setPosition(getMousePosition(e, ref));
            }
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (mouseDown && ref.current) {
                setPosition(getMousePosition(e, ref));
            }
        };
        const handleMouseUp = () => {
            mouseDown = false;
        };
        ref.current?.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            ref.current?.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [ref]);
    return [position] as const;
}
