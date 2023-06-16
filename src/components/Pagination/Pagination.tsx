import { useEffect } from 'react';
import { IStateWithPages } from '../../store/features/IStateWithPages';
import { PaginationButtons } from './PaginationButtons';

interface PaginationProps extends IStateWithPages {
    children?: React.ReactNode;
    loading: boolean;
    getEntriesFetch: () => void;
    setPage: (page: number) => void;
}

export default function Pagination({
    loading,
    children,
    currentPage,
    totalItems,
    itemsPerPage,
    getEntriesFetch,
    setPage,
}: PaginationProps) {
    useEffect(() => {
        getEntriesFetch();
    }, [currentPage, getEntriesFetch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Total: {totalItems}</h1>
            {children}
            <PaginationButtons
                setPage={setPage}
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
}
