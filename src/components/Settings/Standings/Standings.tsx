import Toggle from '../../Toggle.tsx';
import {useAppSelector} from '../../../hooks.ts';
import {useEffect, useState} from 'react';
import {timeConvert} from '../../../utils';

// setArr(data.values.CarIdxF2Time.filter(i => i !== -1)); TODO Standings Çalışıyor
const Standings = () => {
  const {session, telemetry} = useAppSelector(state => state.irsdk);
  const [driverStandings, setDriverStandings] = useState([]);
  const interval = (time: string, leaderTime: string) => {
    const timeArr = time.split(':');
    const leaderArr = leaderTime.split(':');
    const timeInSec = (+timeArr[0]) * 60 + (+timeArr[1]) + (+timeArr[2]) / 1000;
    const leaderInSec = (+leaderArr[0]) * 60 + (+leaderArr[1]) + (+leaderArr[2]) / 1000;
    return timeInSec - leaderInSec;
  };
  useEffect(() => {
    const timeList = telemetry?.values?.CarIdxF2Time.map(item => timeConvert(item));
    const posList = telemetry?.values?.CarIdxPosition;
    const arr = session?.data?.DriverInfo.Drivers
      .map((item, index) => ({
        ...item,
        lapTime: timeList[item.CarIdx],
        position: posList[item.CarIdx],
        pc: telemetry?.values?.CarIdxLapDistPct[item.CarIdx]
      }))
      .filter((item, index) => item.lapTime !== '0:00.000')
      .sort((a, b) => a.position - b.position);
    setDriverStandings(arr as any);
  }, [session, telemetry]);
  return (
    <div>
      <div className={'border-b border-gray-400 mt-9 flex items-center justify-between'}>
        <span className={'text-3xl font-ubuntu-regular ital text-gray-700'}>
                Standings
        </span>
        <Toggle name={'Standings'}/>
      </div>
      <div>
        {
          driverStandings?.map((item, index) => (
            <div key={index} className={'flex'}>
              <div className={'flex gap-10 items-center border-b border-gray-400 py-1 w-full'}>
                {/*<span className={'text-gray-600 w-1/4'}>{item.position}</span>*/}
                {/*<span className={'text-gray-600 w-1/4'}>{item.UserName}</span>*/}
                {/*<span className={'text-gray-600 w-1/4'}>#{item.CarNumber}</span>*/}
                {/*<span className={'text-gray-600 w-1/4'}>{item.lapTime}</span>*/}
                {/*<span className={'text-gray-600 w-1/4'}>{(item.pc * 100).toString().substring(0,4)}</span>*/}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Standings;
