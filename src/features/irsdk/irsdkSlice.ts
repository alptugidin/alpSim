import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IrsdkTelemetryEvent} from 'node-irsdk-mjo/src/types/TelemetryEvent';
import {IrsdkSessionEvent} from 'node-irsdk-mjo/src/types/SessionEvent';

export interface IrsdkState {
  telemetry: IrsdkTelemetryEvent;
  session: IrsdkSessionEvent;
}

const initialState: IrsdkState = {
  telemetry: {} as IrsdkTelemetryEvent,
  session: {} as IrsdkSessionEvent
};

export const irsdkSlice = createSlice({
  name: 'irsdk',
  initialState,
  reducers: {
    setTelemetry: (state, action: PayloadAction<IrsdkTelemetryEvent>) => {
      state.telemetry = action.payload;
    },
    setSession: (state, action: PayloadAction<IrsdkSessionEvent>) => {
      state.session = action.payload;
    }
  },
});

export const {setTelemetry, setSession} = irsdkSlice.actions;

export default irsdkSlice.reducer;
