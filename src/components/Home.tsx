import React from 'react';
import Menu from './Menu.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store.ts';
import {useAppSelector} from '../hooks.ts';

const Home = () => {
  const {name} = useAppSelector(state => state.menu);
  return (
    <div className={'h-[100vh] flex'}>
      <Menu />
      <div className={'w-9/12 p-3'}>active memnu {name}</div>
    </div>
  );
};

export default Home;
