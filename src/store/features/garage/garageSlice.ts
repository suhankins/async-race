import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStateWithPages } from '../IStateWithPages';
import { ICar } from '../../ICar';
import { IWinnersEntry } from '../winners/winnersSlice';
import { callApi } from '../../../utils/callApi';

export interface IGarageEntry extends ICar {
    isEngineStarted: boolean;
    loading: boolean;
    distance: number;
    velocity: number;
}

export interface IGarageState extends IStateWithPages {
    isInRace: boolean;
    loading: boolean;
    cars: IGarageEntry[];
}

const initialState: IGarageState = {
    isInRace: false,
    loading: true,
    currentPage: 0,
    totalItems: 0,
    itemsPerPage: 7,
    cars: [],
};

const findCar = (state: IGarageState, id: number) => {
    return state.cars.find((car) => car.id === id);
};

const setCarLoading = (state: IGarageState, id: number, loading: boolean) => {
    const car = findCar(state, id);
    if (car) car.loading = loading;
};

const setCarLoadingActionFactory = <T extends ICar | number>(
    loading: boolean
) => {
    return (state: IGarageState, action: PayloadAction<T>) => {
        const id =
            typeof action.payload === 'number'
                ? action.payload
                : action.payload.id;
        setCarLoading(state, id, loading);
    };
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
        getCarFetch: setCarLoadingActionFactory<number>(true),
        getCarSuccess(state, action: PayloadAction<ICar>) {
            const car = findCar(state, action.payload.id);
            if (car) {
                car.loading = false;
                car.name = action.payload.name;
                car.color = action.payload.color;
            }
        },
        getCarFailure: setCarLoadingActionFactory<number>(false),
        deleteCarFetch: setCarLoadingActionFactory<number>(true),
        deleteCarFailure: setCarLoadingActionFactory<number>(false),
        deleteCarSuccess(_state) {},
        updateCarFetch: setCarLoadingActionFactory<ICar>(true),
        updateCarSuccess(state, action: PayloadAction<ICar>) {
            const car = findCar(state, action.payload.id);
            if (car) {
                car.loading = false;
                car.name = action.payload.name;
                car.color = action.payload.color;
            }
        },
        updateCarFailure: setCarLoadingActionFactory<number>(false),
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
            const car = findCar(state, action.payload.id ?? 0);
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
            const car = findCar(state, action.payload);
            if (car) car.isEngineStarted = false;
        },
        resetCar(state, action: PayloadAction<number>) {
            const car = findCar(state, action.payload);
            if (car) {
                car.isEngineStarted = false;
                car.distance = 0;
                car.velocity = 0;
            }
        },
        startRace(state) {
            state.isInRace = true;
            state.cars.forEach((car) => {
                car.isEngineStarted = true;
            });
        },
        carFinished(state, action: PayloadAction<IWinnersEntry>) {
            if (!state.isInRace) return;
            // TODO: Modal like "Car {name} finished with {time} seconds"
            state.isInRace = false;

            // TODO: Refactor this callback hell
            const finalTimeInThisRace = action.payload.time / 1000;
            callApi('winners', 'POST', {
                ...action.payload,
                time: finalTimeInThisRace,
            }).then((response) => {
                if (response.ok) return;
                callApi(`winners/${action.payload.id}`, 'GET').then(
                    (response) => {
                        if (!response.ok) return;
                        response.json().then((data) => {
                            callApi(`winners/${action.payload.id}`, 'PUT', {
                                wins: data.wins + 1,
                                time:
                                    finalTimeInThisRace < data.time
                                        ? finalTimeInThisRace
                                        : data.time,
                            });
                        });
                    }
                );
            });
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
    startRace,
    carFinished,
} = garageSlice.actions;
export default garageSlice.reducer;
