import {useAppSelector} from '../hooks.ts';
import {useEffect, useRef, useState} from 'react';
import {timeConvert} from '../utils';
import {mock2} from '../mock2.ts';
import {json} from 'react-router-dom';
import {standingHelper} from '../helpers';
import {EventInfos} from '../types';

const ID = 94608;
const myInfos = {
  id: -1,
  carClassName: '',
  carClassId: -1,
  classArrayIndex: -1,
  displayedRowCount: 0,
  boxHeight: 0
};

const useFetchFromSim = () => {
  const {data} = useAppSelector(state => state.irsdk);
  const [loading, setLoading] = useState(false);
  const [driverStandings, setDriverStandings] = useState<any[]>([]);
  const [rawData, setRawData] = useState<any[]>([]); // TEMP
  const jsonDataRef = useRef<any>(null);
  const [eventInfos, setEventInfos] = useState<EventInfos>({} as EventInfos);

  useEffect(() => {
    if (!data) return;
    if (data[0] !== '{') return;

    const jsonData = JSON.parse(data);
    jsonDataRef.current = jsonData;
    const eventType = jsonData?.WeekendInfo.EventType;
    const teamRacing = jsonData?.WeekendInfo.TeamRacing === 1;
    setEventInfos(prev => ({
      ...prev,
      teamRacing,
      sessionTime: jsonData?.SessionTime
    }));
    const currentSessionResults = jsonData?.SessionInfo?.Sessions.find((session: any) => session.SessionType === eventType)?.ResultsPositions;
    // const practiceResults = jsonData?.SessionInfo?.Sessions.find((session: any) => session.SessionType === 'Practice')?.ResultsPositions;
    // const qualifyResults = jsonData?.SessionInfo?.Sessions.find((session: any) => session.SessionType === 'Qualify')?.ResultsPositions;
    // const raceResults = jsonData?.SessionInfo?.Sessions.find((session: any) => session.SessionType === 'Race')?.ResultsPositions;

    const drivers = jsonData.DriverInfo?.Drivers
      .filter((d: any) => d.UserName !== 'Pace Car' && d.UserName !== 'Alptug Idin2')
      .map((driver: any) => {
        const driverData = currentSessionResults?.find((result: any) => result.CarIdx === driver.CarIdx);
        return {
          ...driver,
          Position: driverData?.Position,
          ClassPosition: driverData?.ClassPosition,
          Lap: driverData?.Lap,
          Time: driverData?.Time,
          FastestLap: driverData?.FastestLap,
          FastestTime: driverData?.FastestTime,
          LastTime: driverData?.LastTime,
          LapsLed: driverData?.LapsLed,
          LapsComplete: driverData?.LapsComplete,
          JokerLapsComplete: driverData?.JokerLapsComplete,
          LapsDriven: driverData?.LapsDriven,
          Incidents: driverData?.Incidents,
          ReasonOutId: driverData?.ReasonOutId,
          ReasonOutStr: driverData?.ReasonOutStr,
          CarIdxLapDistPct: jsonData.CarIdxLapDistPct[driver.CarIdx],
          CarIdxLapCompleted: jsonData.CarIdxLapCompleted[driver.CarIdx],
        };
      });
    const sordCondition = teamRacing ? 'ClassPosition' : 'Position';
    drivers.sort((a: any, b: any) => a[sordCondition] - b[sordCondition]);
    // const driver = drivers.find((driver: any) => driver.UserID === jsonData.DriverInfo.DriverUserID); // real data
    const driver = drivers.find((driver: any) => driver.UserID === ID); // mock data
    const classNames = [...new Set(drivers.map((s: any) => s.CarClassShortName))] as string[];
    const classObject: { [key: string]: any } = {};
    const myClass = driver?.CarClassShortName;
    const pos = driver?.ClassPosition;

    classNames.forEach((carClass: string, i: number) => {
      classObject[carClass] = drivers.filter((driver: any) => driver.CarClassShortName === carClass);
      if (carClass !== myClass) {
        classObject[carClass] = classObject[carClass].slice(0, 3);
      } else {
        classObject[carClass] = standingHelper(pos, classObject[carClass]);
      }
    });
    setRawData(drivers);
    setDriverStandings(Object.values(classObject));
  }, [data]);

  return {
    driverStandings,
    loading,
    myInfos,
    rawData,
    jsonData: jsonDataRef.current,
    eventInfos
  };
};

export default useFetchFromSim;

