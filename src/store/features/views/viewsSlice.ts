import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentViewIndex: 0,
};

const viewsSlice = createSlice({
    name: 'garage',
    initialState,
    reducers: {
        setCurrentViewIndex(state, action: PayloadAction<number>) {
            state.currentViewIndex = action.payload;
        },
    },
});

export const { setCurrentViewIndex } = viewsSlice.actions;
export default viewsSlice.reducer;
