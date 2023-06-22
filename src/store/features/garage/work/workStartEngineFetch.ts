import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { startEngineSuccess } from '../garageSlice';
import { callApi } from '../../../../utils/callApi';

export interface EngineStartResponse {
    velocity: number;
    distance: number;
}

export function* workStartEngineFetch(action: PayloadAction<number>) {
    try {
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
    } catch (e) {
        console.error(e);
    }
}