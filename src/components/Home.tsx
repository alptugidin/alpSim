import React, {Suspense, useEffect, useState} from 'react';
import Menu from './Menu.tsx';
import {useAppDispatch, useAppSelector} from '../hooks.ts';
import Standings from './Settings/Standings/Standings.tsx';
import {useDispatch} from 'react-redux';
import {setPlacementMode} from '../features/box/boxSlice.ts';
import {IrsdkTelemetryEvent} from 'node-irsdk-mjo/src/types/TelemetryEvent';
import {IrsdkSessionEvent, SplitTimeInfo} from 'node-irsdk-mjo/src/types/SessionEvent';
import {setSession, setTelemetry} from '../features/irsdk/irsdkSlice.ts';

const Home = () => {
  const dispatch = useAppDispatch();

  const {name} = useAppSelector(state => state.menu);
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<Standings />);
  const changeMenuComponent = (path: string) => {
    const Comp = React.lazy(() => import(path));
    setActiveComponent(<Comp />);
  };

  useEffect(() => {
    changeMenuComponent(`./Settings/${name}/${name}.tsx`);

  }, [name]);

  useEffect(() => {
    window.box.placement((param: boolean) => {
      dispatch(setPlacementMode(param));
    });

    window.iRacing.telemetry((data: IrsdkTelemetryEvent) => {
      dispatch(setTelemetry(data));
    });

    window.iRacing.session((data: IrsdkSessionEvent) => {
      dispatch(setSession(data));
    });
  }, []);

  return (
    <div className={'h-[100vh] flex bg-gray-200'}>
      <Menu />
      <div className={'w-9/12 p-3'}>
        <Suspense fallback={<div>loading</div>}>
          {activeComponent}
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
