import { call, put, select } from 'redux-saga/effects';
import { RootState } from '../../../rootStore';
import { ICar } from '../../../ICar';
import {
    setTotalItems,
    getGarageSuccess,
    getGarageFailure,
} from '../garageSlice';
import { callApi } from '../../../../utils/callApi';

export function* workGetGarageFetch() {
    try {
        const state: {
            currentPage: number;
            itemsPerPage: number;
        } = yield select((state: RootState) => state.garage);
        const garageRequest: Response = yield call(() =>
            callApi('garage', 'GET', {
                _page: state.currentPage + 1,
                _limit: state.itemsPerPage,
            })
        );
        if (!garageRequest.ok) throw new Error('Failed to fetch garage');
        const garageJson: ICar[] = yield garageRequest.json();
        yield put(
            setTotalItems(
                parseInt(garageRequest.headers.get('X-Total-Count') ?? '0')
            )
        );
        yield put(getGarageSuccess(garageJson));
    } catch (e) {
        console.error(e);
        yield put(getGarageFailure());
    }
}
