import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IrsdkState {
  data: object
}

const initialState: IrsdkState = {
  data: {}
};

export const irsdkSlice = createSlice({
  name: 'irsdk',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<object>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = irsdkSlice.actions;

export default irsdkSlice.reducer;
