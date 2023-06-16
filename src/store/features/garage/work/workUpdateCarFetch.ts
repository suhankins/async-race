import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { updateCarFailure, updateCarSuccess } from '../garageSlice';
import { ICar } from '../../../ICar';

export function* workUpdateCarFetch(action: PayloadAction<ICar>) {
    try {
        const updateRequest: Response = yield call(() =>
            fetch(`http://localhost:3000/garage/${action.payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(action.payload),
            })
        );
        if (!updateRequest.ok) throw new Error('Failed to update car');
        const updatedCar: ICar = yield updateRequest.json();
        yield put(updateCarSuccess(updatedCar));
    } catch (e) {
        console.error(e);
        yield put(updateCarFailure(action.payload.id));
    }
}
