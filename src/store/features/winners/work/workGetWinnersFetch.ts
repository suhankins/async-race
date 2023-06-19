import { call, put, select } from 'redux-saga/effects';
import { RootState } from '../../../rootStore';
import {
    IWinnersEntry,
    IWinnersEntryWithNameAndColor,
    SortBy,
    SortOrder,
    getWinnersFailure,
    getWinnersSuccess,
    setTotalItems,
} from '../winnersSlice';

export function* workGetWinnersFetch() {
    try {
        const state: {
            currentPage: number;
            itemsPerPage: number;
            sortBy: SortBy;
            sortOrder: SortOrder;
        } = yield select((state: RootState) => state.winners);
        const winnersRequest: Response = yield call(() =>
            fetch(
                `http://localhost:3000/winners?_page=${
                    state.currentPage + 1
                }&_limit=${state.itemsPerPage}&_sort=${state.sortBy}&_order=${
                    state.sortOrder
                }`
            )
        );
        if (!winnersRequest.ok) throw new Error('Failed to fetch winners');
        const winnersJson: IWinnersEntry[] = yield winnersRequest.json();
        const winnersWithNamesAndColors: IWinnersEntryWithNameAndColor[] = [];
        for (const winner of winnersJson) {
            const carRequest: Response = yield call(() =>
                fetch(`http://localhost:3000/garage/${winner.id}`)
            );
            if (!carRequest.ok) throw new Error('Failed to fetch car');
            const carJson: { name: string; color: string } =
                yield carRequest.json();
            winnersWithNamesAndColors.push({
                ...winner,
                name: carJson.name,
                color: carJson.color,
            });
        }
        yield put(
            setTotalItems(+(winnersRequest.headers.get('X-Total-Count') ?? '0'))
        );
        yield put(getWinnersSuccess(winnersWithNamesAndColors));
    } catch (e) {
        console.error(e);
        yield put(getWinnersFailure());
    }
}
