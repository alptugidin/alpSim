import React from 'react';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';

interface IGainLoss {
  startPos: number;
  currentPos: number;
}

{/*<FaChevronUp className={'text-[10px] text-green-500'}/>*/}
{/*<FaChevronDown className={'text-[10px] text-red-500'} /> 1*/}

const GainLoss: React.FC<IGainLoss> = ({startPos, currentPos}) => {
  const pos = Math.abs(startPos - currentPos);
  return (
    <div className={'flex gap-0.5 w-full items-center'}>
      {startPos === currentPos && <span className={'w-1/4 mx-auto'}><hr/></span>}
      {startPos < currentPos && <> <FaChevronDown className={'text-[10px] text-red-500'} />{pos}</>}
      {startPos > currentPos && <> <FaChevronUp className={'text-[10px] text-green-500'} />{pos}</>}
    </div>
  );
};

export default GainLoss;
