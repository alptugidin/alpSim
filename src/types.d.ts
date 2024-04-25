import { IrsdkSessionEvent } from './types/SessionEvent';
import { IrsdkTelemetryEvent } from './types/TelemetryEvent';

export declare global {
  interface Window {
    iRacing: {
        data: (callBack: (message: number) => void) => void;
    },
    openNewWindow: () => void;
  }
}

export declare module 'node-irsdk-2023' {
  interface Options {
    telemetryUpdateInterval?: number;
    sessionInfoUpdateInterval?: number;
    sessionInfoParser?: (data: any) => any;
  }

  interface JsIrSdk {
    new (IrSdkNodeWrapper: any, opts: Options): void;
    on(event: 'Connected', listener: () => void): this;
    on(event: 'Disconnected', listener: () => void): this;
    on(event: 'Telemetry', listener: (data: IrsdkTelemetryEvent) => void): this;
    on(event: 'TelemetryDescription', listener: (data: any) => void): this;
    on(event: 'SessionInfo', listener: (data: IrsdkSessionEvent) => void): this;
  }

  export function init(opts?: Options): JsIrSdk;
  export function getInstance(): JsIrSdk;
}
