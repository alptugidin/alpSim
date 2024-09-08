import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../hooks.ts';
import {FaRoad} from 'react-icons/fa';
import {TiArrowLoop} from 'react-icons/ti';
import {TbTemperature} from 'react-icons/tb';
import {LuAlertTriangle} from 'react-icons/lu';
import {decToHex, intToHex, timeConvert} from '../../../utils';
import useFetchFromSim from '../../../hooks/useFetchFromSim.tsx';
import GainLoss from './GainLoss.tsx';
import timeDiff from '../../../utils/timeDiff.ts';
import { GiFullMotorcycleHelmet } from 'react-icons/gi';

const F1Standings = () => {
  const listRef = React.createRef<HTMLDivElement>();
  const myId = '94608';
  const {placementMode} = useAppSelector(state => state.box);
  const {driverStandings, loading, eventInfos} = useFetchFromSim();

  const [jsonData, setJsonData] = useState<any>([]);

  const irating = (ir: string) => {
    return ir[0] + '.' + ir[1] + ' k';
  };

  const srTextStyle = (sr: string) => {
    const c = sr.split(' ')[0];
    let color = '';
    let fontWeight = 'normal';
    switch (c) {
      case 'R':
        color = 'white';
        break;
      case 'D':
        color = 'white';
        break;
      case 'C':
        color = 'black';
        fontWeight = 'bold';
        break;
      case 'B':
        color = 'black';
        fontWeight = 'bold';
        break;
      case 'A':
        color = 'white';
        break;
    }
    return {color, fontWeight};
  };

  useEffect(() => {
    // console.log(driverStandings);
    if (driverStandings.length > 0) {
      // window.box.setHeight('Standings', myInfos.boxHeight);
    }
  }, [driverStandings]);

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
      {/*<div className={`h-[100vh] text-f1 select-none overflow-hidden bg-opacity-40 ${placementMode ? 'draggable' : ''}`}>*/}
      <div className={'h-[100vh] text-f1 select-none overflow-hidden bg-opacity-40 draggable'}>
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
          <div
            key={index}
          >
            {/*<div*/}
            {/*  className={'px-2 h-7 text-[11px] w-fit flex items-center mt-1 rounded-tl-lg bg-gradient-to-r from-black/50'}*/}
            {/*  style={{backgroundColor: intToHex(carClass[0]?.CarClassColor)}}*/}
            {/*>*/}
            {/*  <div className={''}>*/}
            {/*    <span*/}
            {/*      className={'text-[#181A20] font-ubuntu-bold text-[14px] text-center z-20'}>{carClass[0].CarClassShortName}*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  <div>*/}

            {/*  </div>*/}
            {/*  /!*<div className={'absolute h-7 w-1/2 left-0 bg-gradient-to-r from-black/50 z-10 rounded-t-lg'} />*!/*/}
            {/*  <div className={'absolute h-7 w-[150px] right-0 bg-[#181A20] bg-opacity-80 flex items-center text-white rounded-tr-lg'}>*/}
            {/*    <span className={'px-2'}>Gap</span>*/}
            {/*    <span className={'px-1'}>Last</span>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className={'h-7 w-full rounded-t-lg overflow-hidden flex text-[11px] relative'}>
              <div className={'w-fit h-full px-2 bg-white relative z-20 flex items-center font-bold'}>
                <div className={'absolute h-full w-full bg-gradient-to-r from-black/50 z-10 left-0'} />
                {carClass[0].CarClassShortName}
              </div>
              {/*<div className={''}>*/}
              {/*    sdsd*/}
              {/*</div>*/}
              <div>
                {/*<div className={'absolute h-full w-full bg-gradient-to-r from-black/50 z-10 right-0'} />*/}
                <div className={'absolute h-full w-[150px] right-0 bg-[#181A20] bg-opacity-80 flex items-center text-white rounded-tr-lg'}>
                  <span className={'px-2'}>Last</span>
                  <span className={'px-6'}>Best</span>
                </div>
              </div>
            </div>
            <div ref={listRef}>
              {carClass.map((item: any, index2: number) => (
                <div
                  key={index2}
                  className={`flex items-center bg-[#181A20] bg-opacity-80 h-[26px] text-[11px] ${myId == item.UserID ? 'bg-yellow-500' : ' bg-[#181A20]'}`}
                >
                  <span
                    className={'text-white/80 w-5 text-center bg-black/50 h-full flex items-center justify-center'}>{item.ClassPosition + 1}</span>
                  {/*<span style={{color: '#' + item.CarDesignStr.split(',')[1]}} className={'w-4 text-center text-lg pb-0.5'}>|</span>*/}

                  <span style={{color: decToHex(carClass[0]?.CarClassColor)}}
                    className={'w-7 truncate text-center'}
                  >
                    {/*#{item.CarNumber}*/}
                    {item.CarIdx}
                  </span>
                  <img src="/p.png" width={24} className={''} alt="partner"/>
                  <span className={'text-white w-40 truncate'}>
                    {eventInfos.teamRacing ? item.TeamName : item.UserName}
                  </span>
                  <span
                    className={'bg-white w-11 text-center rounded-full font-bold'}>{irating(item.IRating?.toString())}</span>
                  <span
                    // className={`ml-1.5 rounded-full font-bold w-12 text-center text-whit ${srColor(item.LicString)}`}>{item.LicString}</span>
                    style={{
                      backgroundColor: decToHex(item.LicColor),
                      ...srTextStyle(item.LicString),
                    }}
                    className={'ml-1.5 rounded-full w-12 text-center'}
                  >
                    {item.LicString}
                  </span>

                  <span className={'text-white w-11 text-center'}>
                    {/*{timeDiff({t1: item.LastTime, t2: item.BestTime})}*/}
                    {/*{timeConvert(item.FrontCarLastTime)}*/}
                    {item.FrontCarGap}
                  </span>
                  <span className={'text-white w-16 text-left'}>
                    {/*  {timeConvert(item.LastTime)}*/}
                    {(item.CarIdxLapDistPct * 100).toFixed(1)}
                  </span>
                  <span className={'text-white w-16 text-left'}>
                    {/*  {timeConvert(item?.FastestTime)}*/}
                    {item.CarIdxLapCompleted}
                  </span>
                  <span className={'text-white w-9 flex items-center justify-center gap-1 pl-1'}>
                    <GainLoss startPos={item.StartPosition} currentPos={item.ClassPosition + 1}/>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default F1Standings;

