import { createSlice, PayloadAction, CaseReducer } from "@reduxjs/toolkit";

interface State {
  accessToken: string;
}

const initialState: State = {
  accessToken: "",
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = slice.actions;

export default slice.reducer;
