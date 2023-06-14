import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    deleteCarFailure,
    deleteCarFetch,
    getGarageFailure,
    getGarageFetch,
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
        console.error(e);
        yield put(getGarageFailure());
    }
}

function* workDeleteCarFetch(action: { payload: number }) {
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

export function* garageSaga() {
    yield takeLatest(getGarageFetch, workGetGarageFetch);
    yield takeEvery(deleteCarFetch, workDeleteCarFetch);
}
