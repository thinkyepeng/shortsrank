import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
  name: 'topic',
  initialState: {
  },
  reducers: {
    updateByKey: () => {},
  },
});

export const { updateByKey } = pageSlice.actions;

export default pageSlice;
