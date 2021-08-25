import { createSlice } from '@reduxjs/toolkit';
import { saveToLS } from '../utils';

const initialState = {
  value: [],
};

export const usersDataSlice = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    setUsersData: (state, { payload }) => {
      state.value = payload;
      saveToLS(payload)
    },
  },
});

export const { setUsersData } = usersDataSlice.actions;
export const selectUsersData = (state) => state.usersData.value;
export default usersDataSlice.reducer;
