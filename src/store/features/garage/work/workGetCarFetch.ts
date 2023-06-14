import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { ICar } from '../../../../models/ICar';
import { getCarSuccess, getCarFailure } from '../garageSlice';

export function* workGetCarFetch(action: PayloadAction<number>) {
    try {
        const carRequest: Response = yield call(() =>
            fetch(`http://localhost:3000/garage/${action.payload}`)
        );
        if (!carRequest.ok) throw new Error('Failed to fetch car');
        const carJson: ICar = yield carRequest.json();
        yield put(getCarSuccess(carJson));
    } catch (e) {
        console.error(e);
        yield put(getCarFailure(action.payload));
    }
}
