import { setPage } from '../../store/features/garage/garageSlice';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';

export function PaginationButtons({
    currentPage,
    totalItems,
    itemsPerPage,
}: {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const dispatch = useAppDispatch();

    return (
        <div>
            {new Array(totalPages).fill(null).map((_, page) => (
                <button
                    type="button"
                    key={page}
                    onClick={() => dispatch(setPage(page))}
                >
                    {page + 1} {page === currentPage && '(current)'}
                </button>
            ))}
        </div>
    );
}
