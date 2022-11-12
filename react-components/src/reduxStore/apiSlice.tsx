import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NamedAPIResource, ResponseAdapter } from 'types/api/responseTypes';
import { apiLoader, getAPIResourceList, pagination, responseAdapter } from 'utils';

export interface apiState {
  resourceList: ReturnType<typeof responseAdapter>;
  pokemonTypes: NamedAPIResource[];
  statusApi: null | string;
  error: null | string;
}

type FetchType = {
  page: number;
  pageSize: number;
  pokemonType: string;
};

export const fetchPokemonType = createAsyncThunk('apiSlice/fetchPokemonType', (url: string) =>
  getAPIResourceList(url)
);

export const fetchResourceList = createAsyncThunk('apiSlice/fetchFull', async (req: FetchType) => {
  if (!req.pokemonType) {
    return apiLoader(
      `https://pokeapi.co/api/v2/pokemon?limit=${req.pageSize}&offset=${
        req.pageSize * (req.page - 1)
      }`
    );
  } else {
    const resp = await apiLoader(`https://pokeapi.co/api/v2/type/${req.pokemonType}`);
    return pagination(resp, req.page, req.pageSize);
  }
});

const apiStateSlice = createSlice({
  name: 'apiSlice',

  initialState: {
    resourceList: {
      count: 0,
      results: [],
    },
    pokemonTypes: [],
    statusApi: null,
    error: null,
  } as apiState,

  reducers: {
    changeResourceList(state, action) {
      state.resourceList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchResourceList.pending, (state) => {
        (state.statusApi = 'loading'), (state.error = null);
      })
      .addCase(fetchResourceList.fulfilled, (state, action) => {
        console.log(action),
          (state.statusApi = 'resolved'),
          (state.error = null),
          (state.resourceList = responseAdapter(action.payload as ResponseAdapter));
      })
      .addCase(fetchResourceList.rejected, (state) => {
        (state.statusApi = 'rejected'), (state.error = 'action.payload');
      })
      .addCase(fetchPokemonType.fulfilled, (state, action) => {
        state.pokemonTypes = action.payload.results;
      });
  },
});

export const { changeResourceList } = apiStateSlice.actions;
export default apiStateSlice.reducer;
