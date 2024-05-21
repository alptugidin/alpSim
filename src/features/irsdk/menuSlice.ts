import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {MenuName} from '../../types';
import FuelIndicator from '../../components/Settings/FuelIndicator/FuelIndıcator.tsx';

export interface MenuState {
  name: string
  enabled: Record<MenuName, boolean>
}

const initialState: MenuState = {
  name: 'Standings',
  enabled: {
    Standings: false,
    Relative: false,
    Speedometer: false,
    Trackmap: false,
    Radar: false,
    FuelIndicator: false,
  }
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEnabled: (state, action: PayloadAction<{name: MenuName, value: boolean}>) => {
      state.enabled[action.payload.name] = action.payload.value;
    }}}
);

export const { setActiveMenu, setEnabled } = menuSlice.actions;

export default menuSlice.reducer;
