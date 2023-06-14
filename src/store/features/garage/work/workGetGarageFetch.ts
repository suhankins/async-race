import { call, put, select } from 'redux-saga/effects';
import { RootState } from '../../../rootStore';
import { ICar } from '../../../../models/ICar';
import {
    setTotalItems,
    getGarageSuccess,
    getGarageFailure,
} from '../garageSlice';

export function* workGetGarageFetch() {
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
