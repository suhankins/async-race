export function PaginationButtons({
    currentPage,
    totalItems,
    itemsPerPage,
    setPage,
}: {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    setPage: (page: number) => void;
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div>
            {new Array(totalPages).fill(null).map((_, page) => (
                <button type="button" key={page} onClick={() => setPage(page)}>
                    {page + 1} {page === currentPage && '(current)'}
                </button>
            ))}
        </div>
    );
}
