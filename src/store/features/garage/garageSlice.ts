import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStateWithPages } from '../IStateWithPages';
import { ICar } from '../../../models/ICar';

export interface IGarageEntry extends ICar {
    isEngineStarted: boolean;
    loading: boolean;
    /**
     * Position on the track.
     * Should be a number between 0 and 1.
     */
    position: number;
}

export interface IGarageState extends IStateWithPages {
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

const setCarLoading = (state: IGarageState, id: number, loading: boolean) => {
    const car = state.cars.find((car) => car.id === id);
    if (car) car.loading = loading;
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
                loading: false,
                isEngineStarted: false,
                position: 0,
            }));
        },
        getGarageFailure(state) {
            state.loading = false;
        },
        getCarFetch(state, action: PayloadAction<number>) {
            setCarLoading(state, action.payload, true);
        },
        getCarSuccess(state, action: PayloadAction<ICar>) {
            const car = state.cars.find((car) => car.id === action.payload.id);
            if (car) {
                car.loading = false;
                car.name = action.payload.name;
                car.color = action.payload.color;
            }
        },
        getCarFailure(state, action: PayloadAction<number>) {
            setCarLoading(state, action.payload, false);
        },
        deleteCarFetch(state, action: PayloadAction<number>) {
            setCarLoading(state, action.payload, true);
        },
        deleteCarFailure(state, action: PayloadAction<number>) {
            setCarLoading(state, action.payload, false);
        },
        updateCarFetch(state, action: PayloadAction<ICar>) {
            setCarLoading(state, action.payload.id, true);
        },
        updateCarSuccess() {},
        updateCarFailure(state, action: PayloadAction<number>) {
            setCarLoading(state, action.payload, false);
        },
        setTotalItems(state, action: PayloadAction<number>) {
            state.totalItems = action.payload;
        },
    },
});

export const {
    deleteCarFailure,
    deleteCarFetch,
    updateCarFailure,
    updateCarFetch,
    updateCarSuccess,
    getGarageFailure,
    getGarageFetch,
    getGarageSuccess,
    getCarFailure,
    getCarFetch,
    getCarSuccess,
    setTotalItems,
} = garageSlice.actions;
export default garageSlice.reducer;
