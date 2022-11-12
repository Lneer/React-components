import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  page: number;
  pageSize: number;
  pokemonType: string;
}

const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState: {
    page: 1,
    pageSize: 20,
    pokemonType: '',
  } as InitialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    changePageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },

    changeType(state, action: PayloadAction<string>) {
      state.pokemonType = action.payload;
    },
  },
});

export const { changePage, changePageSize, changeType } = mainPageSlice.actions;
export default mainPageSlice.reducer;
