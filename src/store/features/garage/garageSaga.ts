import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    carFinished,
    createCarFetch,
    createCarSuccess,
    deleteCarFetch,
    deleteCarSuccess,
    generateRandomCars,
    getCarFetch,
    getGarageFetch,
    setPage,
    startEngineFetch,
    startRace,
    updateCarFetch,
} from './garageSlice';
import { workGetGarageFetch } from './work/workGetGarageFetch';
import { workDeleteCarFetch } from './work/workDeleteCarFetch';
import { workUpdateCarFetch } from './work/workUpdateCarFetch';
import { workGetCarFetch } from './work/workGetCarFetch';
import { workCreateCarFetch } from './work/workCreateCarFetch';
import { workGenerateRandomCars } from './work/workGenerateRandomCars';
import { workStartEngineFetch } from './work/workStartEngineFetch';
import { workStartRace } from './work/workStartRace';
import { workCarFinished } from './work/workCarFInished';

export function* garageSaga() {
    yield takeLatest(getGarageFetch, workGetGarageFetch);
    yield takeLatest(deleteCarSuccess, workGetGarageFetch);
    yield takeLatest(createCarSuccess, workGetGarageFetch);
    yield takeLatest(setPage, workGetGarageFetch);
    yield takeLatest(startRace, workStartRace);

    yield takeEvery(carFinished, workCarFinished);
    yield takeEvery(startEngineFetch, workStartEngineFetch);
    yield takeEvery(generateRandomCars, workGenerateRandomCars);
    yield takeEvery(deleteCarFetch, workDeleteCarFetch);
    yield takeEvery(updateCarFetch, workUpdateCarFetch);
    yield takeEvery(getCarFetch, workGetCarFetch);
    yield takeEvery(createCarFetch, workCreateCarFetch);
}
