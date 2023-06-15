import { RefObject, useEffect, useState } from 'react';

function getMousePosition(e: MouseEvent, ref: RefObject<HTMLDivElement>) {
    if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        let x = (e.clientX - rect.left) / rect.width;
        let y = (e.clientY - rect.top) / rect.height;

        if (x < 0) x = 0;
        if (x > 1) x = 1;
        if (y < 0) y = 0;
        if (y > 1) y = 1;

        return { x, y };
    }
    return { x: 0, y: 0 };
}

/**
 *
 * @returns
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
