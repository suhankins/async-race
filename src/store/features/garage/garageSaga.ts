import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    deleteCarFetch,
    getCarFetch,
    getGarageFetch,
    updateCarFetch,
} from './garageSlice';
import { workGetGarageFetch } from './work/workGetGarageFetch';
import { workDeleteCarFetch } from './work/workDeleteCarFetch';
import { workUpdateCarFetch } from './work/workUpdateCarFetch';
import { workGetCarFetch } from './work/workGetCarFetch';

export function* garageSaga() {
    yield takeLatest(getGarageFetch, workGetGarageFetch);
    yield takeEvery(deleteCarFetch, workDeleteCarFetch);
    yield takeEvery(updateCarFetch, workUpdateCarFetch);
    yield takeEvery(getCarFetch, workGetCarFetch);
}
