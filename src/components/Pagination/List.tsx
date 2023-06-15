import { FC } from 'react';
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
                <li key={item.id}>
                    {
                        // TODO: This causes an warning in console when you add new items to the list
                        // Warning: React has detected a change in the order of Hooks called by List.
                        renderItem(item)
                    }
                </li>
            ))}
        </ul>
    );
}
