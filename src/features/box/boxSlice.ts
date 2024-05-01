import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  placementMode: true,
};

const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    setPlacementMode: (state, action: PayloadAction<boolean>) => {
      state.placementMode = action.payload;
    },
  },
});

export const {setPlacementMode} = boxSlice.actions;

export default boxSlice.reducer;
