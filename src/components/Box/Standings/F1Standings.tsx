import {useAppSelector} from '../../../hooks.ts';
import {mock} from '../../../mock.ts';

const F1Standings = () => {
  const { placementMode } = useAppSelector(state => state.box);

  function convertToHex(color: number) {
    let r : number | string = (color >> 16) & 255;
    let g : number | string = (color >> 8) & 255;
    let b : number | string = color & 255;

    r = r.toString(16).padStart(2, '0');
    g = g.toString(16).padStart(2, '0');
    b = b.toString(16).padStart(2, '0');

    return '#' + r + g + b;
  }

  const irating = (ir: string) => {
    return ir[0] + '.' + ir[1] + ' k';
  };

  return (
    <div className={`h-[100vh] select-none ${placementMode ? 'draggable' : ''}`}>
      {mock.slice(0,10).map((item, index) => (
        <div className={'flex text-f1 items-center bg-[#181A20] bg-opacity-95 pl-2 h-7 text-xs'}>
          <span className={'text-white italic w-[25px] text-center'}>{item.position}</span>
          <span style={{color: '#' + item.CarDesignStr.split(',')[1]}} className={'w-4 text-center text-lg pb-0.5'}>|</span>
          <img src="/p.png" width={24} className={'mr-2'} alt="partner"/>
          <span className={'text-white w-4/12 truncate'}>{item.UserName}</span>
          <span className={'text-white w-14 text-center'}>#{item.CarNumber}</span>
          <span className={'bg-white w-14 text-center rounded-full font-bold'}>{irating(item.IRating.toString())}</span>
          <span style={{backgroundColor: convertToHex(item.LicColor) }} className={'ml-3 text-black px-2 rounded-full font-bold w-[68px] text-center'}>{item.LicString}</span>
          <span className={'text-white w-[87px] text-center'}>{item.lapTime}</span>
        </div>
      ))}
    </div>
  );
};

export default F1Standings;
