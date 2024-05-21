import React, {useCallback, useEffect, useState, memo} from 'react';
import {IToggle, MenuName} from '../types';
import {useAppDispatch, useAppSelector} from '../hooks.ts';
import {setEnabled} from '../features/irsdk/menuSlice.ts';

const Toggle: React.FC<IToggle> = ({name}) => {
  const {enabled} = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(enabled[name]);
  useEffect(() => {

  }, []);
  return (
    <div
      onClick={() => {
        setValue(!value);
        dispatch(setEnabled({name, value: !value}));
        if (!value) {
          window.box.open(name);
        } else {
          window.box.close(name);
        }
      }}
      className={`w-12 h-6 rounded-full p-1 cursor-pointer shadow-inner flex transition-all ${!value ? 'bg-gray-900 ' : 'bg-green-600'}`}>
      <div
        style={{transform: !value ? 'translateX(0px)' : 'translateX(24px)'}}
        className={'w-4 h-4 bg-' +
         'white rounded-full transition-all custom-shadow'}
      />
    </div>
  );
};

export default Toggle;
