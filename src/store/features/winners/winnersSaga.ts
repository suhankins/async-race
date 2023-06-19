import { takeLatest } from 'redux-saga/effects';
import {
    getWinnersFetch,
    switchOrder,
    setPage,
    setSortBy,
} from './winnersSlice';
import { workGetWinnersFetch } from './work/workGetWinnersFetch';

export function* winnersSaga() {
    yield takeLatest(getWinnersFetch, workGetWinnersFetch);
    yield takeLatest(setPage, workGetWinnersFetch);
    yield takeLatest(setSortBy, workGetWinnersFetch);
    yield takeLatest(switchOrder, workGetWinnersFetch);
}
