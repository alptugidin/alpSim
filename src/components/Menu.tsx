import React from 'react';
import {IMenu, MenuName} from '../types';
import {setActiveMenu} from '../features/irsdk/menuSlice.ts';
import {useAppDispatch, useAppSelector} from '../hooks.ts';
const Menu = () => {
  const {name, enabled} = useAppSelector(state => state.menu);
  const dispatch = useAppDispatch();
  const menu: IMenu[] = [
    {
      title: 'Standings',
      name : 'Standings',
      isActive: false
    },
    {
      title: 'Relative',
      name: 'Relative',
      isActive: false
    },
    {
      title: 'Speedometer',
      name: 'Speedometer',
      isActive: false
    },
    {
      title: 'Trackmap',
      name: 'Trackmap',
      isActive: false
    },
    {
      title: 'Radar',
      name: 'Radar',
      isActive: false
    },
    {
      title: 'Fuel Indicator',
      name: 'FuelIndicator',
      isActive: false
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
        <ul className={'font-light text-lg flex flex-col gap-2 select-none font-ubuntu-thin'}>
          {menu.map((item, index) => (
            <li
              onClick={() => handleMenuSelection(item.name)}
              style={{
                paddingLeft: name === item.name ? '16px' : '',
                backgroundColor: name === item.name ? 'rgb(55 65 81)' : ''
              }}
              className={'cursor-pointer hover:bg-gray-700 px-2 py-1 transition-all flex h-10 gap-1'}
              key={index}>
              <div className={`w-1.5 rounded-full transition-all ${enabled[item.name] ? ' bg-white glow' : 'bg-gray-500'}`}/>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
