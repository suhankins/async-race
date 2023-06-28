import { put, select } from 'redux-saga/effects';
import { RootState } from '../../../rootStore';
import { PayloadAction } from '@reduxjs/toolkit';
import { IWinnersEntry } from '../../winners/winnersSlice';
import { callApi } from '../../../../utils/callApi';
import { IGarageEntry, stopRace } from '../garageSlice';
import { openModal } from '../../modal/modalSlice';

export function* workCarFinished(action: PayloadAction<IWinnersEntry>) {
    console.log('workCarFinished');
    const state: {
        isInRace: boolean;
        cars: IGarageEntry[];
    } = yield select((state: RootState) => state.garage);
    if (!state.isInRace) return;
    yield put(stopRace());
    console.log('workCarFinished: isInRace');
    const finalTimeInThisRace = action.payload.time / 1000;

    try {
        const addWinnerResponse: Response = yield callApi('winners', 'POST', {
            ...action.payload,
            time: finalTimeInThisRace,
        });
        if (addWinnerResponse.ok) return;

        const getWinnerResponse: Response = yield callApi(
            `winners/${action.payload.id}`,
            'GET'
        );
        if (!getWinnerResponse.ok) return;

        const winner: IWinnersEntry = yield getWinnerResponse.json();
        yield callApi(`winners/${action.payload.id}`, 'PUT', {
            wins: winner.wins + 1,
            time:
                finalTimeInThisRace < winner.time
                    ? finalTimeInThisRace
                    : winner.time,
        });

        const car = state.cars.find((car) => car.id === action.payload.id);
        yield put(openModal(`Car ${car?.name} won!`));
    } catch (e) {
        console.error(e);
    }
}
