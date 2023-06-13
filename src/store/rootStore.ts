import { configureStore } from '@reduxjs/toolkit';
import garageSlice from './features/garage/garageSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const saga = createSagaMiddleware();

export const store = configureStore({
    middleware: [saga],
    reducer: {
        garage: garageSlice,
        //winners: winnersSlice,
    },
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
