import {IrsdkSessionEvent} from './types/SessionEvent';
import {IrsdkTelemetryEvent} from './types/TelemetryEvent';
import React from 'react';

export declare global {
  interface Window {
    iracing: {
      // telemetry: (callBack: (data) => void) => void;
      // session: (callBack: (data) => void) => void;
      // telemetryPy: (callBack: (data) => void) => void;
      // sessionPy: (callBack: (data) => void) => void;
      data: (callBack: (data: any) => void) => void;
    },
    box: {
      open: (name: string) => void;
      close: (name: string) => void;
      placement: (callBack: (param: boolean) => void) => void;
      debug: () => void;
    },
  }
}

export interface IMenu {
  title: string;
  name: MenuName;
  isActive: boolean;
  icon?: React.ReactNode;
}

export type MenuName = 'Standings' | 'Relative' | 'Speedometer' | 'Trackmap' | 'Radar' | 'FuelIndicator';

export interface IToggle {
  name: MenuName;
}

export type Theme = 'f1' | 'acc';
