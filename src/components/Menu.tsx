import React from 'react';
import {IMenu, MenuName} from '../types';
import {setActiveMenu} from '../features/irsdk/menuSlice.ts';
import {useAppDispatch, useAppSelector} from '../hooks.ts';
import { FaListOl } from 'react-icons/fa';
import { RxLapTimer } from 'react-icons/rx';
import { MdOutlineSpeed } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TbRadar2 } from 'react-icons/tb';
import { BsFillFuelPumpFill } from 'react-icons/bs';

const Menu = () => {
  const {name, enabled} = useAppSelector(state => state.menu);
  const dispatch = useAppDispatch();
  const menu: IMenu[] = [
    {
      title: 'Standings',
      name: 'Standings',
      isActive: false,
      icon: <FaListOl />

    },
    {
      title: 'Relative',
      name: 'Relative',
      isActive: false,
      icon: <RxLapTimer />
    },
    {
      title: 'Speedometer',
      name: 'Speedometer',
      isActive: false,
      icon: <MdOutlineSpeed />
    },
    {
      title: 'Trackmap',
      name: 'Trackmap',
      isActive: false,
      icon: <FaMapMarkerAlt />
    },
    {
      title: 'Radar',
      name: 'Radar',
      isActive: false,
      icon: <TbRadar2 />
    },
    {
      title: 'Fuel Indicator',
      name: 'FuelIndicator',
      isActive: false,
      icon: <BsFillFuelPumpFill />
    }
  ];

  const handleMenuSelection = (name: string) => {
    dispatch(setActiveMenu(name));
  };

  return (
    <div className={'h-full w-3/12 p-4'}>
      <div className={'bg-white/20 backdrop-blur-sm w-full h-full text-white rounded-lg opacity-90 overflow-hidden'}>
        <div className={'h-24 flex justify-center'}>
          <img src="/alpSim.svg" alt="" className={'w-1/2'}/>
        </div>
        <ul className={'font-light text-lg flex flex-col gap-2 select-none'}>
          {menu.map((item, index) => (
            <li
              onClick={() => handleMenuSelection(item.name)}
              style={{
                paddingLeft: name === item.name ? '16px' : '',
                backgroundColor: name === item.name ? '#ffffff30' : ''
              }}
              className={`cursor-pointer hover:bg-white/30 px-2 py-1 transition-all flex h-10 gap-3 text-[15px] items-center relative ${name === item.name ? 'text-white font-semibold' : 'text-white/60'}`}
              key={index}>
              {/*<div className={`w-1.5 transition-all ${enabled[item.name] ? ' bg-white glow' : 'bg-white/10'}`}/>*/}
              {item.icon}
              {item.title}
              {enabled[item.name] ? <div className={'w-3 h-3 bg-emerald-600 animate-pulse rounded-full absolute right-2'}/> : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
