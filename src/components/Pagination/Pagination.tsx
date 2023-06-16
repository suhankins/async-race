import { useEffect } from 'react';
import { IStateWithPages } from '../../store/features/IStateWithPages';
import { PaginationButtons } from './PaginationButtons';

interface PaginationProps extends IStateWithPages {
    children?: React.ReactNode;
    loading: boolean;
    getGarageFetch: () => void;
}

export default function Pagination({
    loading,
    children,
    currentPage,
    totalItems,
    itemsPerPage,
    getGarageFetch,
}: PaginationProps) {
    useEffect(() => {
        getGarageFetch();
    }, [currentPage, getGarageFetch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Total: {totalItems}</h1>
            {children}
            <PaginationButtons
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
}
