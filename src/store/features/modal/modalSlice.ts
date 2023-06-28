import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    content: '',
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<string>) {
            state.content = action.payload;
            state.isOpen = true;
        },
        closeModal(state) {
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
