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
import { CarIcon } from '../CarIcon/CarIcon';

import styles from './WinnersTable.module.scss';

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

    const getWinners = useCallback(
        () => dispatch(getWinnersFetch()),
        [dispatch]
    );
    const handleSetPage = useCallback(
        (page: number) => dispatch(setPage(page)),
        [dispatch]
    );

    return (
        <Pagination
            getEntries={getWinners}
            handleSetPage={handleSetPage}
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
                            <td>
                                <CarIcon
                                    className={styles.carIcon}
                                    color={entry.color}
                                />
                            </td>
                            <td>{entry.name}</td>
                            <td>{entry.wins}</td>
                            <td>{entry.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Pagination>
    );
};
