import { FC, createElement } from 'react';
import { IItemWithId } from '../../models/IItemWithId';

export interface ListProps<T> {
    items: T[];
    renderItem: FC<T>;
}

export default function List<T extends IItemWithId>({
    items,
    renderItem,
}: ListProps<T>) {
    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>{createElement(renderItem, item)}</li>
            ))}
        </ul>
    );
}
