import { all } from 'redux-saga/effects';
import { garageSaga } from './features/garage/garageSaga';
import { winnersSaga } from './features/winners/winnersSaga';

export default function* rootSaga() {
    yield all([garageSaga(), winnersSaga()]);
}
