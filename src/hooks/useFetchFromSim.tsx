import {useAppSelector} from '../hooks.ts';
import {useEffect, useState} from 'react';
import {timeConvert} from '../utils';
import {mock2} from '../mock2.ts';
import {json} from 'react-router-dom';
const ID = 705294;
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

  useEffect(() => {
    if (!data) return;
    if (data[0] !== '{') return;

    const jsonData = JSON.parse(data);
    const eventType  = jsonData?.WeekendInfo.EventType;
    const teamRacing = jsonData?.WeekendInfo.TeamRacing === 1;
    const currentSessionResults = jsonData?.SessionInfo?.Sessions.find((session: any) => session.SessionType === eventType)?.ResultsPositions;
    // const practiceResults = jsonData?.SessionInfo?.Sessions.find((session: any) => session.SessionType === 'Practice')?.ResultsPositions;
    // const qualifyResults = jsonData?.SessionInfo?.Sessions.find((session: any) => session.SessionType === 'Qualify')?.ResultsPositions;
    // const raceResults = jsonData?.SessionInfo?.Sessions.find((session: any) => session.SessionType === 'Race')?.ResultsPositions;

    const drivers = jsonData.DriverInfo?.Drivers
      .filter((d: any) => d.UserName !== 'Pace Car')
      .map((driver: any) => {
        const driverData = currentSessionResults?.find((result: any) => result.CarIdx === driver.CarIdx);
        return {
          ...driver,
          Position: driverData?.Position,
          ClassPosition: driverData?.ClassPosition,
          Lap: driverData?.Lap,
          Time: driverData?.Time,
          FastestLap: driverData?.FastestLap,
          FastestTime : driverData?.FastestTime,
          LastTime: driverData?.LastTime,
          LapsLed: driverData?.LapsLed,
          LapsComplete: driverData?.LapsComplete,
          JokerLapsComplete: driverData?.JokerLapsComplete,
          LapsDriven: driverData?.LapsDriven,
          Incidents: driverData?.Incidents,
          ReasonOutId: driverData?.ReasonOutId,
          ReasonOutStr: driverData?.ReasonOutStr,
        };
      });
    const sordCondition = teamRacing ? 'ClassPosition' : 'Position';
    drivers.sort((a: any, b: any) => a[sordCondition] - b[sordCondition]);
    // const driver = drivers.find((driver: any) => driver.UserID === jsonData.DriverInfo.DriverUserID); // real data
    const driver = drivers.find((driver: any) => driver.UserID === ID); // mock data
    const classNames = [...new Set(drivers.map((s: any) => s.CarClassShortName))] as string[];
    const classObject: {[key: string]: any} = {};
    const myClass = driver?.CarClassShortName;

    classNames.forEach((carClass: string, i: number) => {
      classObject[carClass] = drivers.filter((driver: any) => driver.CarClassShortName === carClass);
      if (carClass !== myClass) {
        classObject[carClass] = classObject[carClass].slice(0, 3);
      } else {
        const classCount = classObject[carClass].length;
        const classCountArr = [...Array(classCount).keys()].map((i) => i.toString());
        // const position = driver.ClassPosition + 1; // teamRacing ? driver.ClassPosition : driver.Position;
        const pos = 1;
        //   create an array contain 1 to 10 string nuymbers
        const arr = [...Array(10).keys()].map((i) => (i+1).toString());
        const c = classObject[carClass];
        let resArr: any[] = [];

        // if (position <= 4) {
        //   // 1, 2, 3, 4, 5, 6, c.length - 2, c.length - 1, c.length
        // } else if (position > 4) {
        //   // 1, 3, 4, 5, 6, 7, c.length - 1, c.length
        // } else if (position < c.length - 3) {
        //   // 1, 2, c.length - 6, c.length - 5, c.length - 4, c.length - 3, c.length - 2, c.length - 1, c.length
        // }  else if (position >= c.length - 3) {
        //   // 1, 2, c.length - 6, c.length - 5, c.length - 4, c.length - 3, c.length - 2, c.length - 1, c.length
        // }

        const range = [pos - 2, pos - 1, pos, pos + 1, pos + 2];

        resArr = [
          1,
          2,
          3,
          pos - 2,
          pos - 1,
          pos,
          pos + 1,
          pos + 2,
          c.length
        ];

        if (pos <= 3) {
        //
        }

        console.log([...new Set(resArr)]);
      }
    });

  //   console.log(jsonData?.SessionInfo?.Sessions.find((session: any) => session.SessionType === eventType));
  //   const qualifyResults = jsonData?.SessionInfo?.Sessions.find((session: any) => session.SessionName === 'QUALIFY')?.ResultsPositions;
  //   // .map((result: any, index: number) => ({
  //   //   ...result,
  //   //   FontCarLastTime: index + 1
  //   // }));
  //   const drivers = jsonData.DriverInfo?.Drivers;
  //
  //   myInfos.id = jsonData.DriverInfo?.DriverUserID;
  //   myInfos.carClassName = jsonData.DriverInfo?.Drivers.find((driver: any) => driver.UserID === myInfos.id)?.CarClassShortName ?? '';
  //   myInfos.carClassId = jsonData.DriverInfo?.Drivers.find((driver: any) => driver.UserID === myInfos.id)?.CarClassID ?? -1;
  //
  //   const standingArr: any[] = [];
  //   resultsPositions?.forEach((result: any, index: number) => {
  //     const frontCarTime = resultsPositions.find((res: any) => res.Position === result.Position - 1)?.Time ?? 0;
  //     const leaderTime = resultsPositions.find((res: any) => res.Position === 1)?.Time ?? 0;
  //     const driverInfo = drivers?.find((driver: any) => driver.CarIdx === result.CarIdx);
  //     console.log(result);
  //     const driverObj = {
  //       ...result,
  //       UserName: driverInfo?.UserName,
  //       CarClassID: driverInfo?.CarClassID,
  //       AbbrevName: driverInfo?.AbbrevName,
  //       Initials: driverInfo?.Initials,
  //       UserID: driverInfo?.UserID,
  //       TeamID: driverInfo?.TeamID,
  //       TeamName: driverInfo?.TeamName,
  //       CarNumber: driverInfo?.CarNumber,
  //       CarNumberRaw: driverInfo?.CarNumberRaw,
  //       CarPath: driverInfo?.CarPath,
  //       CarID: driverInfo?.CarID,
  //       CarIsPaceCar: driverInfo?.CarIsPaceCar,
  //       CarIsAI: driverInfo?.CarIsAI,
  //       CarScreenName: driverInfo?.CarScreenName,
  //       CarScreenNameShort: driverInfo?.CarScreenNameShort,
  //       CarClassShortName: driverInfo?.CarClassShortName,
  //       CarClassRelSpeed: driverInfo?.CarClassRelSpeed,
  //       CarClassLicenseLevel: driverInfo?.CarClassLicenseLevel,
  //       CarClassMaxFuelPct: driverInfo?.CarClassMaxFuelPct,
  //       CarClassColor: driverInfo?.CarClassColor,
  //       CarClassEstLapTime: driverInfo?.CarClassEstLapTime,
  //       IRating: driverInfo?.IRating,
  //       LicLevel: driverInfo?.LicLevel,
  //       LicSubLevel: driverInfo?.LicSubLevel,
  //       LicString: driverInfo?.LicString,
  //       LicColor: driverInfo?.LicColor,
  //       ClubName: driverInfo?.ClubName,
  //       ClubID: driverInfo?.ClubID,
  //       DivisionName: driverInfo?.DivisionName,
  //       DivisionID: driverInfo?.DivisionID,
  //       CurDriverIncidentCount: driverInfo?.CurDriverIncidentCount,
  //       StartPosition: qualifyResults?.find((qualifyResult: any) => qualifyResult.CarIdx === result.CarIdx)?.Position ?? 0,
  //       FrontCarGap: result.Position === 1 ? 'int' : (result.Time - leaderTime).toFixed(1),
  //     };
  //     standingArr.push(driverObj);
  //   });
  //
  //   const classes = [...new Set(standingArr.map(s => s.CarClassShortName))];
  //   let rowCount = 0;
  //   const arr: any[] = [];
  //   if (classes.length > 1) {
  //     classes.forEach((carClass) => {
  //       arr.push(standingArr.filter((driver) => driver.CarClassShortName === carClass));
  //     });
  //     const myClassIndex = arr.findIndex((subArr) => subArr[0].CarClassShortName === myInfos.carClassName);
  //
  //     const finArr: any[] = [];
  //
  //     arr.forEach((subArr, index) => {
  //       if (index !== myClassIndex) {
  //         finArr.push(subArr.slice(0, 3));
  //         rowCount += 3;
  //       } else {
  //         finArr.push(subArr.slice(0, 10));
  //         rowCount += 10;
  //       }
  //     });
  //     setDriverStandings(finArr);
  //   } else {
  //     arr.push(standingArr.slice(0, 10));
  //     // arr.push(standingArr);
  //     setDriverStandings(arr);
  //     rowCount = arr.length + (arr.length * 3);
  //   }
  //   myInfos.boxHeight = (rowCount * 28) + (arr.length * 28) + (arr.length * 4);
  }, [data]);

  return {
    driverStandings,
    loading,
    myInfos
  };
};

export default useFetchFromSim;
