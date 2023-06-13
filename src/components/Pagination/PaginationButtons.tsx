export function PaginationButtons({
    currentPage,
    totalItems,
    itemsPerPage,
}: {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
}) {
    return (
        <div>
            {Array.from(
                { length: Math.ceil(totalItems / itemsPerPage) },
                (_, i) => i + 1
            ).map((page) => (
                <button key={page} onClick={() => console.log(page)}>
                    {page} {page === currentPage && '(current)'}
                </button>
            ))}
        </div>
    );
}
