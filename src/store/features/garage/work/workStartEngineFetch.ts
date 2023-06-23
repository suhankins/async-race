import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { breakEngine, resetCar, startEngineSuccess } from '../garageSlice';
import { callApi } from '../../../../utils/callApi';

export interface EngineStartResponse {
    velocity: number;
    distance: number;
}

export function* workStartEngineFetch(action: PayloadAction<number>) {
    try {
        // We reset car first, so it starts from the beginning of the track
        yield put(resetCar(action.payload));
        const carRequest: Response = yield call(() =>
            callApi(`engine`, 'PATCH', {
                id: action.payload,
                status: 'started',
            })
        );
        if (!carRequest.ok) throw new Error('Failed to fetch car');
        const engineStartResponse: EngineStartResponse =
            yield carRequest.json();
        yield put(
            startEngineSuccess({
                id: action.payload,
                velocity: engineStartResponse.velocity,
                distance: engineStartResponse.distance,
            })
        );
        yield call(() =>
            callApi(`engine`, 'PATCH', {
                id: action.payload,
                status: 'drive',
            })
        );
        yield put(breakEngine(action.payload));
    } catch (e) {
        console.error(e);
    }
}
