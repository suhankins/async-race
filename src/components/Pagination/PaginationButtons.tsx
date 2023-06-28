export function PaginationButtons({
    currentPage,
    totalItems,
    itemsPerPage,
    handleSetPage,
}: {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    handleSetPage: (page: number) => void;
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="input-group">
            {new Array(totalPages).fill(null).map((_, page) => (
                <button
                    type="button"
                    key={page}
                    onClick={() => handleSetPage(page)}
                    className="btn btn-outline-secondary"
                    disabled={page === currentPage}
                >
                    {page + 1} {page === currentPage && '(current)'}
                </button>
            ))}
        </div>
    );
}
