import { useCallback } from 'react';
import {
    getWinnersFetch,
    setPage,
    setSortBy,
    switchOrder,
} from '../../store/features/winners/winnersSlice';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import Pagination from '../Pagination/Pagination';

export const WinnersTable = () => {
    const {
        entries,
        currentPage,
        itemsPerPage,
        loading,
        totalItems,
        sortBy,
        sortOrder,
    } = useAppSelector((state) => state.winners);

    const dispatch = useAppDispatch();
    const getWinnersFetchDispatch = useCallback(
        () => dispatch(getWinnersFetch()),
        [dispatch]
    );
    const setPageDispatch = useCallback(
        (page: number) => dispatch(setPage(page)),
        [dispatch]
    );

    return (
        <Pagination
            getEntriesFetch={getWinnersFetchDispatch}
            setPage={setPageDispatch}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            loading={loading}
        >
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Car</th>
                        <th>Name</th>
                        <th>
                            <a onClick={() => dispatch(setSortBy('wins'))}>
                                Wins
                            </a>
                            <a onClick={() => dispatch(switchOrder())}>
                                {sortBy === 'wins' &&
                                    ((sortOrder === 'ASC' && '▲') || '▼')}
                            </a>
                        </th>
                        <th>
                            <a onClick={() => dispatch(setSortBy('time'))}>
                                Best time (seconds)
                            </a>
                            <a onClick={() => dispatch(switchOrder())}>
                                {sortBy === 'time' &&
                                    ((sortOrder === 'ASC' && '▲') || '▼')}
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, index) => (
                        <tr key={entry.id}>
                            <td>{index + currentPage * itemsPerPage + 1}</td>
                            <td>NAME GOES HERE {entry.id}</td>
                            <td>COLOR GOES HERE</td>
                            <td>{entry.wins}</td>
                            <td>{entry.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Pagination>
    );
};
