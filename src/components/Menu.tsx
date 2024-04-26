import React from 'react';
import {IMenu} from '../types';
import {setActiveMenu} from '../features/irsdk/menuSlice.ts';
import {useAppDispatch} from '../hooks.ts';
const Menu = () => {
  const dispatch = useAppDispatch();

  const menu: IMenu[] = [
    {
      title: 'Standings',
      name: 'standings',
      isActive: true,
      component: () => <div></div>,
    },
    {
      title: 'Relative',
      name: 'relative',
      isActive: false,
      component: () => <div></div>,
    },
    {
      title: 'Speedometer',
      name: 'speedometer',
      isActive: false,
      component: () => <div></div>,
    },
    {
      title: 'Trackmap',
      isActive: false,
      name: 'trackmap',
      component: () => <div></div>,
    },
    {
      title: 'Radar',
      name: 'radar',
      isActive: false,
      component: () => <div></div>,
    },
    {
      title: 'Fuel Indicator',
      name: 'fuelIndicator',
      isActive: false,
      component: () => <div></div>,
    }
  ];

  const handleMenuSelection = (name: string) => {
    dispatch(setActiveMenu(name));
  };

  return (
    <div className={'h-full w-3/12 p-3'}>
      <div className={'bg-gray-800 w-full h-full text-white rounded-lg opacity-90 overflow-hidden'}>
        <div className={'h-24 flex justify-center'}>
          <img src="/alpSim.svg" alt="" className={'w-1/2'}/>
        </div>
        <ul className={'font-light text-lg flex flex-col gap-2 select-none'}>
          {menu.map((item, index) => (
            <li
              onClick={() => handleMenuSelection(item.name)}
              className={'cursor-pointer hover:bg-gray-700 px-2 py-1 transition-all hover:px-3 flex h-10 gap-1'}
              key={index}>
              {/*<div className={`w-1.5 rounded-full ${item.isActive ? 'bg-green-600' : 'bg-red-600'}`} />*/}
              <div className={`w-1.5 rounded-full  ${item.isActive ? ' bg-white glow' : 'bg-gray-500'}`}/>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
