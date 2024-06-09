import Toggle from '../../Toggle.tsx';
import {useAppSelector} from '../../../hooks.ts';
import {useEffect, useState} from 'react';
import useFetchFromSim from '../../../hooks/useFetchFromSim.tsx';

// setArr(data.values.CarIdxF2Time.filter(i => i !== -1)); TODO Standings Çalışıyor
const Standings = () => {
  const {driverStandings, loading, myInfos} = useFetchFromSim();

  return (
    <div>
      <div className={'bg-white/20 backdrop-blur-sm rounded-lg py-6 px-3 flex items-center justify-between'}>
        <span className={'text-3xl text-white/80 font-ubuntu-thin ital text-white'}>
                Standings
        </span>
        <Toggle name={'Standings'}/>
      </div>
      <div
        className={'bg-white/20 backdrop-blur-sm rounded-lg flex overflow-auto mt-4 h-96 text-white'}
      >

      </div>
    </div>
  );
};

export default Standings;
