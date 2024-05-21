import {useAppSelector} from '../hooks.ts';
import {useEffect, useState} from 'react';
import {timeConvert} from '../utils';
import {mock2} from '../mock2.ts';
import {data} from '../data.ts';

const myInfos = {
  id: -1,
  carClassName: '',
  carClassId: -1
};
const useFetchFromSim = () => {
  // const {data} = useAppSelector(state => state.irsdk);
  // const session = mock2.session;
  // const telemetry = mock2.telemetry;
  const [loading, setLoading] = useState(false);
  const [driverStandings, setDriverStandings] = useState<any[]>([]);
  const myId = 0;
  useEffect(() => {
    const resultsPositions = data?.SessionInfo?.Sessions[0]?.ResultsPositions;
    const drivers = data?.DriverInfo?.Drivers;

    myInfos.id = data?.DriverInfo?.DriverUserID;
    myInfos.carClassName = data?.DriverInfo?.Drivers.find(driver => driver.UserID === myInfos.id)?.CarClassShortName ?? '';
    myInfos.carClassId = data?.DriverInfo?.Drivers.find(driver => driver.UserID === myInfos.id)?.CarClassID ?? -1;

    const standingArr: any[] = [];
    resultsPositions?.forEach((result, index) => {
      const driverInfo = drivers?.find(driver => driver.CarIdx === result.CarIdx);
      const driverObj = {
        ...result,
        UserName: driverInfo?.UserName,
        CarClassID: driverInfo?.CarClassID,
        AbbrevName: driverInfo?.AbbrevName,
        Initials: driverInfo?.Initials,
        UserID: driverInfo?.UserID,
        TeamID: driverInfo?.TeamID,
        TeamName: driverInfo?.TeamName,
        CarNumber: driverInfo?.CarNumber,
        CarNumberRaw: driverInfo?.CarNumberRaw,
        CarPath: driverInfo?.CarPath,
        CarID: driverInfo?.CarID,
        CarIsPaceCar: driverInfo?.CarIsPaceCar,
        CarIsAI: driverInfo?.CarIsAI,
        CarScreenName: driverInfo?.CarScreenName,
        CarScreenNameShort: driverInfo?.CarScreenNameShort,
        CarClassShortName: driverInfo?.CarClassShortName,
        CarClassRelSpeed: driverInfo?.CarClassRelSpeed,
        CarClassLicenseLevel: driverInfo?.CarClassLicenseLevel,
        CarClassMaxFuelPct: driverInfo?.CarClassMaxFuelPct,
        CarClassColor: driverInfo?.CarClassColor,
        CarClassEstLapTime: driverInfo?.CarClassEstLapTime,
        IRating: driverInfo?.IRating,
        LicLevel: driverInfo?.LicLevel,
        LicSubLevel: driverInfo?.LicSubLevel,
        LicString: driverInfo?.LicString,
        LicColor: driverInfo?.LicColor,
        ClubName: driverInfo?.ClubName,
        ClubID: driverInfo?.ClubID,
        DivisionName: driverInfo?.DivisionName,
        DivisionID: driverInfo?.DivisionID,
        CurDriverIncidentCount: driverInfo?.CurDriverIncidentCount,
      };
      standingArr.push(driverObj);
    });

    const classes = [...new Set(standingArr.map(s => s.CarClassShortName))];

    if (classes.length > 1) {
      const arr: any[] = [];
      classes.forEach((carClass) => {
        arr.push(standingArr.filter((driver) => driver.CarClassShortName === carClass));
      });
      setDriverStandings(arr);
    } else {
      const arr: any[] = [...standingArr];
      setDriverStandings(arr);
    }
  }, [data]);

  return {
    driverStandings,
    loading,
    myInfos
  };
};

export default useFetchFromSim;
