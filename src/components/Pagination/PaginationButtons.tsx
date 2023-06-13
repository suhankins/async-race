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
            {new Array(totalPages).map((_, page) => (
                <button key={page} onClick={() => console.log(page)}>
                    {page} {page === currentPage && '(current)'}
                </button>
            ))}
        </div>
    );
}
