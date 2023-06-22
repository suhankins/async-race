import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { ICar } from '../../../ICar';
import { getCarSuccess, getCarFailure } from '../garageSlice';
import { callApi } from '../../../../utils/callApi';

export function* workStartEngineFetch(action: PayloadAction<number>) {
    try {
        const carRequest: Response = yield call(() =>
            callApi(`garage/${action.payload}`)
        );
        if (!carRequest.ok) throw new Error('Failed to fetch car');
        const carJson: ICar = yield carRequest.json();
        yield put(getCarSuccess(carJson));
    } catch (e) {
        console.error(e);
        yield put(getCarFailure(action.payload));
    }
}
