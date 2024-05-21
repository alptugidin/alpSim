import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../hooks.ts';
import {mock} from '../../../mock.ts';
import {FaChevronDown, FaChevronUp, FaRoad} from 'react-icons/fa';
import {TiArrowLoop} from 'react-icons/ti';
import {TbTemperature} from 'react-icons/tb';
import {LuAlertTriangle} from 'react-icons/lu';
import timeDiff from '../../../utils/timeDiff.ts';
import {intToHex, timeConvert} from '../../../utils';
import {mock2} from '../../../mock2.ts';
import useFetchFromSim from '../../../hooks/useFetchFromSim.tsx';

const F1Standings = () => {
  const myUserName = 'Alptug Idin2';
  // const {session, telemetry} = useAppSelector(state => state.irsdk);
  // const session = mock2.session;
  // const telemetry = mock2.telemetry;
  const {placementMode} = useAppSelector(state => state.box);
  const {driverStandings, loading, myInfos} = useFetchFromSim();

  const {data} = useAppSelector(state => state.irsdk);
  const [jsonData, setJsonData] = useState<any>([]);
  useEffect(() => {
    if (data[0] === '{') {
      setJsonData(JSON.parse(data));
    }
  }, [data]);

  const irating = (ir: string) => {
    return ir[0] + '.' + ir[1] + ' k';
  };

  const srColor = (sr: string) => {
    const c = sr.split(' ')[0];
    let color = '';
    switch (c) {
      case 'R':
        color = 'bg-red-500';
        break;
      case 'D':
        color = 'bg-orange-500';
        break;
      case 'C':
        color = 'bg-yellow-500';
        break;
      case 'B':
        color = 'bg-green-500';
        break;
      case 'A':
        color = 'bg-blue-500';
        break;
    }
    return color;
  };

  const standingRangeSelection = (arr: any[]) => {
    const myPosition = arr[arr.findIndex((item: any) => item.UserName === myUserName)].Position;
    const firstThree = [...arr.slice(0, 3)];
    console.log(arr);
    const myGroup = [
      arr[myPosition - 1],
      arr[myPosition],
      arr[myPosition + 1]
    ];

    const lastThree = [...arr.slice(-3)];
    let outputArr = [];
    if (arr.length < 10) {
      outputArr = [
        ...arr
      ];
    } else {
      // console.log(myPosition);
      if (myPosition < 4) {
        outputArr = [
          ...firstThree,
          ...arr.slice(3, 6),
          ...lastThree
        ];
      } else if (myPosition >= 3 && myPosition <= arr.length - 3) {
        outputArr = [
          ...firstThree,
          ...arr.slice(-6, -3),
          ...lastThree
        ];
      } else {
        outputArr = arr;
      }
      // else {
      //   outputArr = arr;
      // }
    }

    const uniqueArr = [...outputArr.map((item: any) => item.UserName)];
    return outputArr;
    // return [...firstThree, ...myGroup, ...lastThree];
  };
  const conditionalSlice = (arr: any[]) => {
    console.log(myInfos);
    if (arr.length < 1) return [];
    if (arr[0].CarClassShortName === myInfos.carClassName) {
      return arr.slice(0, 10);
    } else {
      return arr.slice(0, 3);
    }
  };

  useEffect(() => {
    console.log(driverStandings[0]);

  }, []);

  return (
    <>
      {loading &&
        <div
          className={'absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center text-f1 animate-pulse'}>
          <span className={'text-white text-center animate-pulse'}>
          Loading...
            {/*<br/>*/}
            {/*Session: {Object.keys(session).length}*/}
            {/*{' '}*/}
            {/*Telemetry: {Object.keys(telemetry).length}*/}
          </span>
        </div>
      }
      <div className={`h-[100vh] text-f1 select-none overflow-hidden bg-opacity-40 ${placementMode ? 'draggable' : ''}`}>
        <div
          id={'header'}
          className={'bg-[#181A20] text-white bg-opacity-95 text-[11px] flex h-5 items-center relative hidden'}
        >
          <div className={'pl-1 bg-red-600 w-5 h-full flex items-center'}>
            <span className={''}>Q</span>
          </div>
          <div className={'w-16 flex justify-evenly'}>
            <TiArrowLoop className={'text-[16px]'}/>
            <span>2/30</span>
          </div>
          <div className={'w-24 text-center'}>
            <span>1:11/~30m</span>
          </div>
          <div className={'w-12 flex justify-evenly items-center'}>
            <FaRoad className={'text-[16px] text-gray-400'}/>
            <span>30&#176;</span>
          </div>
          <div className={'w-12 flex justify-evenly items-center'}>
            <TbTemperature className={'text-[15px] text-red-500'}/>
            <span>30&#176;</span>
          </div>
          <div className={'w-20 flex justify-evenly items-center'}>
            <span>SOF 1330</span>
          </div>
          <div className={'w-14 flex justify-evenly items-center'}>
            <LuAlertTriangle className={'text-[16px] text-orange-500'}/>
            <span>x99</span>
          </div>
          <div className={'absolute right-0 w-32 flex text-yellow-400'}>
            <span className={'ml-1.5'}>Last</span>
            <span className={'ml-8'}>Best</span>
          </div>
        </div>
        {/*<hr className={'border border-red-600'}/>*/}
        {/*{standingRangeSelection(driverStandings)*/}
        {driverStandings.map((carClass: any[], index) => (
          <>
            <div
              key={index}
              className={'pl-1 h-7 text-[11px] w-1/2 flex items-center mt-1'}
              style={{backgroundColor: intToHex(carClass[0].CarClassColor)}}
            >
              <span
                className={'text-white font-ubuntu-bold text-[14px] italic text-center'}>{carClass[0].CarClassShortName}</span>

            </div>
            {conditionalSlice(carClass)
              .map((item: any, index: number) => (
                <div
                  key={index}
                  className={`flex items-center bg-[#181A20] bg-opacity-95 pl-1 h-7 text-[11px] ${myUserName === item.UserName ? 'bg-[#181A20]' : ' bg-[#181A20]'}`}
                >
                  <span className={'text-white italic w-4 text-center'}>{item.ClassPosition + 1}</span>
                  <span className={'text-white w-7 flex items-center justify-center gap-1 pl-1'}>
                    <FaChevronUp className={'text-[10px] text-green-500'}/> 1
                    {/*<FaChevronDown className={'text-[10px] text-red-500'} /> 1*/}
                  </span>
                  {/*<span style={{color: '#' + item.CarDesignStr.split(',')[1]}} className={'w-4 text-center text-lg pb-0.5'}>|</span>*/}
                  <span className={'text-white w-7 truncate text-center'}>#{item.CarNumber}</span>
                  <img src="/p.png" width={24} className={''} alt="partner"/>
                  <span className={'text-white w-40 truncate'}>{item.UserName}</span>
                  <span
                    className={'bg-white w-11 text-center rounded-full font-bold'}>{irating(item.IRating.toString())}</span>
                  <span
                    className={`ml-1.5 rounded-full font-bold w-12 text-center ${srColor(item.LicString)}`}>{item.LicString}</span>
                  <span className={'text-white w-11 text-center'}>
                    {/*{timeDiff({t1: item.LastLapTime, t2: item.BestTime, fixed: 1})}*/}
                  </span>
                  <span className={'text-white w-16 text-center'}>{timeConvert(item.LastTime)}</span>
                  <span className={'text-white w-16 text-center'}>{timeConvert(item.FastestTime)}</span>
                </div>
              ))}
          </>
        ))}
      </div>
    </>
  );
};

export default F1Standings;
