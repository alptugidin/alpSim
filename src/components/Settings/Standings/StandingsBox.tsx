import {useAppSelector} from '../../../hooks.ts';
import {useEffect, useState} from 'react';
import {timeConvert} from '../../../utils';
import {IrsdkSessionEvent} from 'node-irsdk-mjo/src/types/SessionEvent';

const StandingsBox = () => {
  const {placementMode} = useAppSelector(state => state.box);
  const {session, telemetry} = useAppSelector(state => state.irsdk);

  const [driverStandings, setDriverStandings] = useState<any[]>([]);
  // useEffect(() => {
  //   const timeList = telemetry?.values?.CarIdxF2Time.map(item => timeConvert(item));
  //   const posList = telemetry?.values?.CarIdxPosition;
  //   const myPos = telemetry?.values?.CarIdxPosition[telemetry?.values?.PlayerCarIdx];
  //   const arr = session?.data?.DriverInfo.Drivers
  //     .map((item, index) => ({
  //       ...item,
  //       lapTime: timeList[item.CarIdx],
  //       position: posList[item.CarIdx],
  //       pc: telemetry?.values?.CarIdxLapDistPct[item.CarIdx]
  //     }))
  //     .sort((a, b) => a.position - b.position)
  //     .filter((item, index) => item.lapTime !== '0:00.000');
  //   console.log(arr);
  //   const first3 = arr.slice(0, 3);
  //   const last = arr.at(-1);
  //   const finArr = [...first3, last];
  //
  //   setDriverStandings(finArr as any);
  // }, [session, telemetry]);
  return (
    // <div className={`bg-gray-900 h-[100vh] p-3 text-white ${placementMode ? 'draggable opacity-50' : 'opacity-90'}`}>
    <div className={`bg-white h-[100vh] ${placementMode ? 'draggable' : ''}`}>

    </div>
  );
};

export default StandingsBox;

