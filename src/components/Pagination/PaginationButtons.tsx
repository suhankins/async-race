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

    return (
        <div>
            {new Array(totalPages).fill(0).map((_, page) => (
                <button key={page} onClick={() => console.log(page)}>
                    {page + 1} {page === currentPage && '(current)'}
                </button>
            ))}
        </div>
    );
}
