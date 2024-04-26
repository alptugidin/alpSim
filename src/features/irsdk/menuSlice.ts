import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MenuState {
  name: string
}

const initialState: MenuState = {
  name: 'standings'
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  },
});

export const { setActiveMenu } = menuSlice.actions;

export default menuSlice.reducer;
