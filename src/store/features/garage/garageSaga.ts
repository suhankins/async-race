import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
    getGarageFailure,
    getGarageSuccess,
    setTotalItems,
} from './garageSlice';
import { ICar } from '../../../models/ICar';
import { RootState } from '../../rootStore';

function* workGetGarageFetch() {
    try {
        const state: {
            currentPage: number;
            itemsPerPage: number;
        } = yield select((state: RootState) => state.garage);
        const garageRequest: Response = yield call(() =>
            fetch(
                `http://localhost:3000/garage?_page=${state.currentPage}&limit=${state.itemsPerPage}`
            )
        );
        if (!garageRequest.ok) throw new Error('Failed to fetch garage');
        const garageJson: ICar[] = yield garageRequest.json();
        yield put(
            setTotalItems(+(garageRequest.headers.get('X-Total-Count') ?? '0'))
        );
        yield put(getGarageSuccess(garageJson));
    } catch (e) {
        console.log(e);
        yield put(getGarageFailure());
    }
}

export function* garageSaga() {
    yield takeLatest('garage/getGarageFetch', workGetGarageFetch);
}
