import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    createCarFetch,
    createCarSuccess,
    deleteCarFetch,
    deleteCarSuccess,
    generateRandomCars,
    getCarFetch,
    getGarageFetch,
    setPage,
    startEngineFetch,
    updateCarFetch,
} from './garageSlice';
import { workGetGarageFetch } from './work/workGetGarageFetch';
import { workDeleteCarFetch } from './work/workDeleteCarFetch';
import { workUpdateCarFetch } from './work/workUpdateCarFetch';
import { workGetCarFetch } from './work/workGetCarFetch';
import { workCreateCarFetch } from './work/workCreateCarFetch';
import { workGenerateRandomCars } from './work/workGenerateRandomCars';
import { workStartEngineFetch } from './work/workStartEngineFetch';

export function* garageSaga() {
    yield takeLatest(getGarageFetch, workGetGarageFetch);
    yield takeLatest(deleteCarSuccess, workGetGarageFetch);
    yield takeLatest(createCarSuccess, workGetGarageFetch);
    yield takeLatest(setPage, workGetGarageFetch);

    yield takeEvery(startEngineFetch, workStartEngineFetch);
    yield takeEvery(generateRandomCars, workGenerateRandomCars);
    yield takeEvery(deleteCarFetch, workDeleteCarFetch);
    yield takeEvery(updateCarFetch, workUpdateCarFetch);
    yield takeEvery(getCarFetch, workGetCarFetch);
    yield takeEvery(createCarFetch, workCreateCarFetch);
}
