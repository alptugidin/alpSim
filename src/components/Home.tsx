import React, {Suspense, useEffect, useState} from 'react';
import Menu from './Menu.tsx';
import {useAppDispatch, useAppSelector} from '../hooks.ts';
import Standings from './Settings/Standings/Standings.tsx';
import {useDispatch} from 'react-redux';
import {setPlacementMode} from '../features/box/boxSlice.ts';
import {IrsdkTelemetryEvent} from 'node-irsdk-mjo/src/types/TelemetryEvent';
import {IrsdkSessionEvent, SplitTimeInfo} from 'node-irsdk-mjo/src/types/SessionEvent';
import {setData, setSession, setTelemetry} from '../features/irsdk/irsdkSlice.ts';
import {data} from '../data.ts';
import useFetchFromSim from '../hooks/useFetchFromSim.tsx';

const Home = () => {
  const dispatch = useAppDispatch();
  const {driverStandings, loading, myInfos} = useFetchFromSim();

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

    // real data
    // window.iracing.data((data: any) => {
    //   if (data[0] === '{') {
    //     dispatch(setData(data));
    //     console.log(data);
    //   }
    // });

    // mock data
    setInterval(() => {
      dispatch(setData(data.trim()));
    } , 1000);
    // window.iRacing.telemetry((data: IrsdkTelemetryEvent) => {
    //   dispatch(setTelemetry(data));
    // });
    //
    // window.iRacing.session((data: IrsdkSessionEvent) => {
    //   dispatch(setSession(data));
    // });
    //
    // window.iRacing.telemetryPy((data: any) => {
    //   console.log(JSON.parse(data));
    // });

    // window.iRacing.sessionPy((data: any) => {
    //   console.log(data);
    // });
  }, []);

  return (
    <div className={'main-bg'}>
      <div className={'h-[100vh] flex bg-black/90'}>
        <Menu />
        <div className={'w-9/12 p-4 pl-0'}>
          <Suspense fallback={<div>loading</div>}>
            {activeComponent}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
