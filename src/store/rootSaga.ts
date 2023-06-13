import { all } from 'redux-saga/effects';
import { garageSaga } from './features/garage/garageSaga';

export default function* rootSaga() {
    yield all([garageSaga()]);
}
