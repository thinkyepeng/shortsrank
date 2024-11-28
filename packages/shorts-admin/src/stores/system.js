import { createSlice } from '@reduxjs/toolkit';

const systemSlice = createSlice({
  name: 'system',
  initialState: {
    folded: false,
    // topic tree data
    tree: [],
    topTopics: [],
  },
  reducers: {
    toggleFold: (state) => {
      state.folded = !state.folded;
    },
  },
});

export const { toggleFold } = systemSlice.actions;
export default systemSlice;
