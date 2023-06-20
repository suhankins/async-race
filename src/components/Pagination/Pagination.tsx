import { useEffect } from 'react';
import { IStateWithPages } from '../../store/features/IStateWithPages';
import { PaginationButtons } from './PaginationButtons';

interface PaginationProps extends IStateWithPages {
    children?: React.ReactNode;
    loading: boolean;
    getEntries: () => void;
    handleSetPage: (page: number) => void;
}

export default function Pagination({
    loading,
    children,
    currentPage,
    totalItems,
    itemsPerPage,
    getEntries,
    handleSetPage,
}: PaginationProps) {
    useEffect(() => {
        getEntries();
    }, [currentPage, getEntries]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Total: {totalItems}</h1>
            {children}
            <PaginationButtons
                handleSetPage={handleSetPage}
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
}
