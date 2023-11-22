import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  userInfo: {},
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    signUp: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const {signUp} = authSlice.actions;

export default authSlice.reducer;
