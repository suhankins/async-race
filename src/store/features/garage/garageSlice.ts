import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStateWithPages } from '../IStateWithPages';
import { ICar } from '../../ICar';

export interface IGarageEntry extends ICar {
    isEngineStarted: boolean;
    loading: boolean;
    distance: number;
    velocity: number;
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
        // TODO: Refactor
        generateRandomCars(state, _action: PayloadAction<number>) {
            state.loading = true;
        },
        getGarageFetch(state) {
            state.loading = true;
        },
        getGarageSuccess(state, action: PayloadAction<ICar[]>) {
            state.loading = false;
            state.cars = action.payload.map((car) => ({
                ...car,
                loading: false,
                isEngineStarted: false,
                distance: 0,
                velocity: 0,
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
        deleteCarSuccess(_state) {},
        updateCarFetch(state, action: PayloadAction<ICar>) {
            setCarLoading(state, action.payload.id, true);
        },
        updateCarSuccess(state, action: PayloadAction<ICar>) {
            const car = state.cars.find((car) => car.id === action.payload.id);
            if (car) {
                car.loading = false;
                car.name = action.payload.name;
                car.color = action.payload.color;
            }
        },
        updateCarFailure(state, action: PayloadAction<number>) {
            setCarLoading(state, action.payload, false);
        },
        createCarFetch(state, _action: PayloadAction<ICar>) {
            state.loading = true;
        },
        createCarSuccess(state) {
            state.loading = false;
        },
        createCarFailure(state) {
            state.loading = false;
        },
        setTotalItems(state, action: PayloadAction<number>) {
            state.totalItems = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        startEngineFetch(_state, _action: PayloadAction<number>) {},
        startEngineSuccess(
            state,
            action: PayloadAction<Partial<IGarageEntry>>
        ) {
            const car = state.cars.find((car) => {
                return car.id === action.payload.id;
            });
            if (!car) {
                console.error(
                    'startEngineSuccess: car not found',
                    action.payload,
                    car
                );
                return;
            }
            console.log('startEngineSuccess', action.payload);
            car.isEngineStarted = true;
            car.velocity = action.payload.velocity ?? 0;
            car.distance = action.payload.distance ?? 0;
        },
        stopEngine(state, action: PayloadAction<number>) {
            const car = state.cars.find((car) => car.id === action.payload);
            if (car) car.isEngineStarted = false;
        },
        resetCar(state, action: PayloadAction<number>) {
            const car = state.cars.find((car) => car.id === action.payload);
            if (car) {
                car.isEngineStarted = false;
                car.distance = 0;
                car.velocity = 0;
            }
        },
    },
});

export const {
    generateRandomCars,
    createCarFetch,
    createCarSuccess,
    createCarFailure,
    deleteCarFailure,
    deleteCarFetch,
    deleteCarSuccess,
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
    setPage,
    startEngineFetch,
    startEngineSuccess,
    stopEngine,
    resetCar,
} = garageSlice.actions;
export default garageSlice.reducer;
