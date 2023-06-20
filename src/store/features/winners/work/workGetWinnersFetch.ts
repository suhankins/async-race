import { call, put, select } from 'redux-saga/effects';
import { RootState } from '../../../rootStore';
import {
    IWinnersEntry,
    IWinnersEntryWithNameAndColor,
    IWinnersState,
    SortBy,
    SortOrder,
    getWinnersFailure,
    getWinnersSuccess,
    setTotalItems,
} from '../winnersSlice';

function winnersUrl(page: number, sortBy: SortBy, sortOrder: SortOrder) {
    return `http://localhost:3000/winners?_page=${page}&_limit=10&_sort=${sortBy}&_order=${sortOrder}`;
}

export function* workGetWinnersFetch() {
    try {
        const state: IWinnersState = yield select(
            (state: RootState) => state.winners
        );
        const { currentPage, sortBy, sortOrder } = state;
        // TODO: Figure out how to put this logic in other functions
        const winnersRequest: Response = yield call(() =>
            fetch(winnersUrl(currentPage + 1, sortBy, sortOrder))
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
