import Toggle from '../../Toggle.tsx';
import {useAppSelector} from '../../../hooks.ts';
import {useEffect, useState} from 'react';
import useFetchFromSim from '../../../hooks/useFetchFromSim.tsx';

// setArr(data.values.CarIdxF2Time.filter(i => i !== -1)); TODO Standings Çalışıyor
const Standings = () => {
  const {driverStandings, loading, myInfos} = useFetchFromSim();
  const [pos, setPos] = useState(1);
  const arr = Array.from({length: 23}, (_, i) => (i + 1).toString());

  const handleOnClick = () => {
    // let finArr: any[] = [];
    // if (pos < 5) {
    //   // 1, 2, 3, 4, 5, 6, 7, 8, 9, last
    //   finArr = [
    //     ...arr.slice(0, 8),
    //     arr.at(-1)
    //   ];
    // } else if (pos >=5 && pos <= 15) {
    //   // first 3, pos - 2, pos - 1, pos, pos + 1, pos + 2, last 3
    //   finArr = [
    //     ...arr.slice(0, 3),
    //     pos - 2,
    //     pos - 1,
    //     pos,
    //     pos + 1,
    //     pos + 2,
    //     arr.at(-1)
    //   ];
    // } else if (pos > 15 && pos < arr.length) {
    //   // first 3, pos - 2, pos - 1, pos, pos + 1, pos + 2, last 3
    //   finArr = [
    //     ...arr.slice(0, 3),
    //     pos - 2,
    //     pos - 1,
    //     pos,
    //     pos + 1 < arr.length ? pos + 1 : -1,
    //     pos + 2 < arr.length ? pos + 2 : -1,
    //     arr.at(-1)
    //   ];
    //   if(arr.length - pos === 1){
    //     finArr = [
    //       ...arr.slice(0, 3),
    //       pos - 4,
    //       pos - 3,
    //       pos - 2,
    //       pos - 1,
    //       pos,
    //       pos + 1,
    //     ];
    //   } else if(arr.length - pos === 2){
    //     finArr = [
    //       ...arr.slice(0, 3),
    //       pos - 3,
    //       pos - 2,
    //       pos - 1,
    //       pos,
    //       pos + 1,
    //       pos + 2,
    //     ];
    //   } else if(arr.length - pos === 3){
    //     finArr = [
    //       ...arr.slice(0, 3),
    //       pos - 2,
    //       pos - 1,
    //       pos,
    //       pos + 1,
    //       pos + 2,
    //       pos + 3,
    //     ];
    //   }
    // } else if (pos === arr.length  ) {
    //   // first 3, pos - 2, pos - 1, pos, pos + 1, last 3
    //   finArr = [
    //     ...arr.slice(0, 3),
    //     pos - 5,
    //     pos - 4,
    //     pos - 3,
    //     pos - 2,
    //     pos - 1,
    //     pos
    //   ];
    // }
    //
    // const standings = [...new Set(finArr.map(x => x.toString()))];
    // // .filter(i => i !== '-1');
    // // .map(i => i === pos.toString() ? Number(i) : i);
    // console.log(pos, standings);
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
        >click</button>
        <br />
        <input
          type="range"
          min="1"
          max="23"
          value={pos}
          onChange={(e) => setPos(parseInt(e.target.value))}
        />
        <br/>
        {pos}
      </div>
    </div>
  );
};

export default Standings;
