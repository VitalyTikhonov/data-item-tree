import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const usersDataSlice = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    setUsersData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUsersData } = usersDataSlice.actions;
export const selectUsersData = (state) => state.usersData.value;
export default usersDataSlice.reducer;
