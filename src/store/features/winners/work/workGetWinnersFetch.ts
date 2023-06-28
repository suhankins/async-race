import { call, put, select } from 'redux-saga/effects';
import { RootState } from '../../../rootStore';
import {
    IWinnersEntry,
    IWinnersEntryWithNameAndColor,
    IWinnersState,
    getWinnersFailure,
    getWinnersSuccess,
    setTotalItems,
} from '../winnersSlice';
import { callApi } from '../../../../utils/callApi';

export function* workGetWinnersFetch() {
    try {
        const state: IWinnersState = yield select(
            (state: RootState) => state.winners
        );

        const { totalItems, winners }: getWinnersReturnType = yield call(() =>
            getWinners(state)
        );

        yield put(setTotalItems(totalItems));
        yield put(getWinnersSuccess(winners));
    } catch (e) {
        console.error(e);
        yield put(getWinnersFailure());
    }
}

type getWinnersReturnType = {
    totalItems: number;
    winners: IWinnersEntryWithNameAndColor[];
};

function* getWinners({
    currentPage,
    sortBy,
    sortOrder,
    itemsPerPage,
}: {
    currentPage: number;
    sortBy: string;
    sortOrder: string;
    itemsPerPage: number;
}) {
    const winnersRequest: Response = yield call(() =>
        callApi('winners', 'GET', {
            _limit: itemsPerPage,
            _page: currentPage + 1,
            _sort: sortBy,
            _order: sortOrder,
        })
    );
    if (!winnersRequest.ok) throw new Error('Failed to fetch winners');
    const rawWinners: IWinnersEntry[] = yield winnersRequest.json();
    const winnersWithNamesAndColors: IWinnersEntryWithNameAndColor[] =
        yield call(() => addWinnersNamesAndColors(rawWinners));
    const totalItems = parseInt(
        winnersRequest.headers.get('X-Total-Count') ?? '0'
    );
    return { totalItems, winners: winnersWithNamesAndColors };
}

/**
 * Winners you get by calling /winners don't have names and colors,
 * so this function adds them.
 */
function* addWinnersNamesAndColors(rawWinners: IWinnersEntry[]) {
    const winnersWithNamesAndColors: IWinnersEntryWithNameAndColor[] = [];
    for (const winner of rawWinners) {
        const carRequest: Response = yield call(() =>
            callApi(`garage/${winner.id}`)
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
    return winnersWithNamesAndColors;
}
