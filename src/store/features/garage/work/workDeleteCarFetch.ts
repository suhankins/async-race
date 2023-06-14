import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { getGarageFetch, deleteCarFailure } from '../garageSlice';

export function* workDeleteCarFetch(action: PayloadAction<number>) {
    try {
        const deleteRequest: Response = yield call(() =>
            fetch(`http://localhost:3000/garage/${action.payload}`, {
                method: 'DELETE',
            })
        );
        if (!deleteRequest.ok) throw new Error('Failed to delete car');
        yield put(getGarageFetch());
    } catch (e) {
        console.error(e);
        yield put(deleteCarFailure(action.payload));
    }
}
