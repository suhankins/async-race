import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStateWithPages } from '../IStateWithPages';
import { ICar } from '../../../models/ICar';

export interface IGarageEntry extends ICar {
    isEngineStarted: boolean;
    /**
     * Position on the track.
     * Should be a number between 0 and 1.
     */
    position: number;
}

interface IGarageState extends IStateWithPages {
    loading: boolean;
    cars: IGarageEntry[];
}

const initialState: IGarageState = {
    loading: true,
    currentPage: 0,
    totalItems: 0,
    itemsPerPage: 7,
    cars: [],
};

const garageSlice = createSlice({
    name: 'garage',
    initialState,
    reducers: {
        getGarageFetch(state) {
            state.loading = true;
        },
        getGarageSuccess(state, action: PayloadAction<ICar[]>) {
            state.loading = false;
            state.cars = action.payload.map((car) => ({
                ...car,
                isEngineStarted: false,
                position: 0,
            }));
        },
        getGarageFailure(state) {
            state.loading = false;
        },
        setTotalItems(state, action: PayloadAction<number>) {
            state.totalItems = action.payload;
        },
    },
});

export const {
    getGarageFailure,
    getGarageFetch,
    getGarageSuccess,
    setTotalItems,
} = garageSlice.actions;
export default garageSlice.reducer;
