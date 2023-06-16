import { call, put } from 'redux-saga/effects';
import { createCarFailure, createCarSuccess } from '../garageSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ICar } from '../../../ICar';

export function* workCreateCarFetch(action: PayloadAction<ICar>) {
    try {
        const createRequest: Response = yield call(() =>
            fetch(`http://localhost:3000/garage/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(action.payload),
            })
        );
        if (!createRequest.ok) throw new Error('Failed to create car');
        yield put(createCarSuccess());
    } catch (e) {
        console.error(e);
        yield put(createCarFailure());
    }
}
