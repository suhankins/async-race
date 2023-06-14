import { useCallback, useState } from 'react';

export function useClickPosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const onClickHandler = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const target = e.target as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            console.log(x, y);
            setPosition({ x, y });
        },
        []
    );
    return [position, onClickHandler] as const;
}
