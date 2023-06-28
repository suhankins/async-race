import { put, select } from 'redux-saga/effects';
import { resetCar, IGarageEntry, startEngineFetch } from '../garageSlice';
import { RootState } from '../../../rootStore';

export interface EngineStartResponse {
    velocity: number;
    distance: number;
}

export function* workStartRace() {
    try {
        const state: {
            cars: IGarageEntry[];
        } = yield select((state: RootState) => state.garage);
        const { cars } = state;
        console.log('workStartRace', cars);
        for (const car of cars) {
            yield put(resetCar(car.id));
            yield put(startEngineFetch(car.id));
        }
    } catch (e) {
        console.error(e);
    }
}
