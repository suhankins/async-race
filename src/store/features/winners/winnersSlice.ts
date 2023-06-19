import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IStateWithPages } from '../IStateWithPages';

export interface IWinnersEntry {
    id: number;
    wins: number;
    time: number;
}

export type SortBy = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';

export interface IWinnersState extends IStateWithPages {
    loading: boolean;
    entries: IWinnersEntry[];
    sortBy: SortBy;
    sortOrder: SortOrder;
}

const initialState: IWinnersState = {
    loading: true,
    currentPage: 0,
    totalItems: 0,
    itemsPerPage: 10,
    sortBy: 'wins',
    sortOrder: 'DESC',
    entries: [],
};

const winnersSlice = createSlice({
    name: 'winners',
    initialState,
    reducers: {
        // TODO: Refactor
        getWinnersFetch(state) {
            state.loading = true;
        },
        getWinnersSuccess(state, action: PayloadAction<IWinnersEntry[]>) {
            state.loading = false;
            state.entries = action.payload;
        },
        getWinnersFailure(state) {
            state.loading = false;
        },
        setSortBy(state, action: PayloadAction<SortBy>) {
            state.sortBy = action.payload;
        },
        switchOrder(state) {
            state.sortOrder = state.sortOrder === 'ASC' ? 'DESC' : 'ASC';
        },
        setTotalItems(state, action: PayloadAction<number>) {
            state.totalItems = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
});

export const {
    getWinnersFetch,
    getWinnersSuccess,
    getWinnersFailure,
    setSortBy,
    switchOrder,
    setTotalItems,
    setPage,
} = winnersSlice.actions;
export default winnersSlice.reducer;
