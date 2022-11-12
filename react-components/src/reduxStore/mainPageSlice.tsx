import { createSlice } from '@reduxjs/toolkit';

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
    changePage(state, action) {
      console.log(state);
      console.log(action);
      state.page = action.payload;
    },

    changePageSize(state, action) {
      state.pageSize = action.payload;
    },

    changeType(state, action) {
      state.pokemonType = action.payload;
    },
  },
});

export const { changePage, changePageSize, changeType } = mainPageSlice.actions;
export default mainPageSlice.reducer;
