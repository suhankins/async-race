import { takeLatest } from 'redux-saga/effects';
import { getWinnersFetch } from './winnersSlice';
import { workGetWinnersFetch } from './work/workGetWinnersFetch';

export function* winnersSaga() {
    yield takeLatest(getWinnersFetch, workGetWinnersFetch);
}
