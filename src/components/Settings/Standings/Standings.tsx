import Toggle from '../../Toggle.tsx';
import {useAppSelector} from '../../../hooks.ts';
import {useEffect, useState} from 'react';
import useFetchFromSim from '../../../hooks/useFetchFromSim.tsx';

// setArr(data.values.CarIdxF2Time.filter(i => i !== -1)); TODO Standings Çalışıyor
const Standings = () => {
  const {driverStandings, loading, myInfos, rawData, jsonData} = useFetchFromSim();
  const [pos, setPos] = useState(1);
  const arr = Array.from({length: 23}, (_, i) => (i + 1).toString());

  const handleOnClick = () => {
  };
  return (
    <div>
      <div className={'bg-white/20 backdrop-blur-sm rounded-lg py-6 px-3 flex items-center justify-between'}>
        <span className={'text-3xl text-white/80 font-ubuntu-thin ital text-white'}>
                Standings
        </span>
        <Toggle name={'Standings'}/>
      </div>
      <div
        className={'bg-white/20 backdrop-blur-sm rounded-lg overflow-auto mt-4 h-96 text-white p-3'}
      >
        <button
          onClick={handleOnClick}
          className={'bg-red-500 px-1 rounded-lg border border-red-800'}
        >click
        </button>
        <button
          className={'bg-blue-500 px-1 rounded-lg border border-red-800'}
          onClick={() => window.box.closeAllBoxes()}
        >kill all popups</button>
        <br/>
        <input
          type="range"
          min="1"
          max="23"
          value={pos}
          onChange={(e) => setPos(parseInt(e.target.value))}
        />
        <br/>
        {pos}
        <br/>
        <button
          className={'bg-red-500 px-1 rounded-lg border border-red-800'}
          onClick={() => {
            console.log(jsonData);
            void navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
          }}
        >copy jsonData
        </button>

        <br/>
        <br/>
        <button
          className={'bg-red-500 px-1 rounded-lg border border-red-800'}
          onClick={() => {
            console.log(rawData);
            void navigator.clipboard.writeText(JSON.stringify(rawData, null, 2));
          }}
        >copy drivers
        </button>

        <br/>
        <br/>
        <button
          className={'bg-red-500 px-1 rounded-lg border border-red-800'}
          onClick={() => {
            console.log(driverStandings);
            void navigator.clipboard.writeText(JSON.stringify(driverStandings, null, 2));
          }}
        >copy standings
        </button>
      </div>
    </div>
  );
};

export default Standings;
