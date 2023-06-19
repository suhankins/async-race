import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { deleteCarFailure, deleteCarSuccess } from '../garageSlice';

export function* workDeleteCarFetch(action: PayloadAction<number>) {
    try {
        const deleteRequest: Response = yield call(() =>
            fetch(`http://localhost:3000/garage/${action.payload}`, {
                method: 'DELETE',
            })
        );
        if (!deleteRequest.ok)
            throw new Error('Failed to delete car from garage');
        // We don't check for the response status here because if it fails,
        // we just assume that the car is not in the winners list
        yield call(() =>
            fetch(`http://localhost:3000/winners/${action.payload}`, {
                method: 'DELETE',
            })
        );
        yield put(deleteCarSuccess());
    } catch (e) {
        console.error(e);
        yield put(deleteCarFailure(action.payload));
    }
}
