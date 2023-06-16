import { configureStore } from '@reduxjs/toolkit';
import garageSlice from './features/garage/garageSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import viewsSlice from './features/views/viewsSlice';
import winnersSlice from './features/winners/winnersSlice';

const saga = createSagaMiddleware();

export const store = configureStore({
    middleware: [saga],
    reducer: {
        garage: garageSlice,
        winners: winnersSlice,
        views: viewsSlice,
    },
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
