import Toggle from '../../Toggle.tsx';
import {useAppSelector} from '../../../hooks.ts';
import {useEffect, useState} from 'react';

// setArr(data.values.CarIdxF2Time.filter(i => i !== -1)); TODO Standings Çalışıyor
const Standings = () => {
  const {data} = useAppSelector(state => state.irsdk);
  const [jsonData, setJsonData] = useState<any>([]);
  useEffect(() => {
    if (data[0] === '{') {
      // console.log(JSON.parse(data).SessionInfo.Sessions[0].ResultsPositions);
      setJsonData(JSON.parse(data));
    }
  }, [data]);
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
        {/*{JSON.stringify(jsonData.SessionInfo.Sessions[0].ResultsPositions, null, 2)}*/}
        <button
          onClick={() => {
            window.box.setHeight('Standings', 555);
          }}
        >click</button>
      </div>
    </div>
  );
};

export default Standings;
