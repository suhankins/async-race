import { call, put } from 'redux-saga/effects';
import { createCarFailure, createCarSuccess } from '../garageSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { callApi } from '../../../../utils/callApi';
import { getRandomWord } from '../../../../utils/getRandomWord';

function generateHexComponent() {
    return Math.floor(Math.random() * 0xff)
        .toString(16)
        .padStart(2, '0');
}

export function* workGenerateRandomCars(action: PayloadAction<number>) {
    try {
        for (let i = 0; i < action.payload; i++) {
            const createRequest: Response = yield call(() =>
                callApi(`garage`, 'POST', {
                    name: getRandomWord() + ' ' + getRandomWord(),
                    color:
                        '#' +
                        generateHexComponent() +
                        generateHexComponent() +
                        generateHexComponent(),
                })
            );
            if (!createRequest.ok) throw new Error('Failed to create car');
        }
        yield put(createCarSuccess());
    } catch (e) {
        console.error(e);
        yield put(createCarFailure());
    }
}
