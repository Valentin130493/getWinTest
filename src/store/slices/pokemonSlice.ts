import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, typesUrl } from "../../constants/api";

export interface PokemonState {
  loading: boolean;
  error: any;
  pokemons: any | [];
  pokemon: any;
  next: string | null;
  prev: string | null;
  count: number | null;
}

export const getAll = createAsyncThunk(
  "pokemon/getAll",
  async (url: string | null, thunkAPI) => {
    try {
      return await axios.get(url as string);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getOneById = createAsyncThunk(
  "pokemon/getOneById",
  async (id: string, thunkAPI) => {
    try {
      return await axios.get(`${baseUrl}/${id}/`);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getOneByName = createAsyncThunk(
  "pokemon/getOneByName",
  async (name: string, thunkAPI) => {
    try {
      return await axios.get(`${baseUrl}/${name}/`);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getByType = createAsyncThunk(
  "pokemon/getByType",
  async (id: string, thunkAPI) => {
    try {
      return await axios.get(`${typesUrl}/${id}`);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const initialState: PokemonState = {
  pokemons: [],
  pokemon: null,
  loading: false,
  error: null,
  next: null,
  prev: null,
  count: null,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAll.fulfilled, (state, { payload }: any) => {
      state.pokemons = payload.data.results;
      state.next = payload.data.next;
      state.prev = payload.data.previous;
      state.count = payload.data.count;
      state.loading = false;
    });
    builder.addCase(getAll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(getOneById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneById.fulfilled, (state, { payload }: any) => {
      state.pokemon = payload.data;
      state.loading = false;
    });
    builder.addCase(getOneById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(getByType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getByType.fulfilled, (state, { payload }: any) => {
      state.pokemons = payload.data.pokemon;
      state.loading = false;
    });
    builder.addCase(getByType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(getOneByName.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneByName.fulfilled, (state, { payload }: any) => {
      state.pokemon = payload.data;
      state.loading = false;
    });
    builder.addCase(getOneByName.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default pokemonSlice.reducer;
