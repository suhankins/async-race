import { useEffect } from 'react';
import { IStateWithPages } from '../../store/features/IStateWithPages';
import List, { ListProps } from './List';
import { PaginationButtons } from './PaginationButtons';
import { IItemWithId } from '../../models/IItemWithId';

interface PaginationProps<T extends IItemWithId>
    extends ListProps<T>,
        IStateWithPages {
    getGarageFetch: () => void;
}

export default function Pagination<T extends IItemWithId>({
    items,
    renderItem,
    currentPage,
    totalItems,
    itemsPerPage,
    getGarageFetch,
}: PaginationProps<T>) {
    useEffect(() => {
        getGarageFetch();
    }, [currentPage, getGarageFetch]);

    return (
        <div>
            <h1>Total: {totalItems}</h1>
            <List<T> items={items} renderItem={renderItem} />
            <PaginationButtons
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
}
