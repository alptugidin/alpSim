import {useAppSelector} from '../hooks.ts';

const Debug = () => {
  const {session, telemetry} = useAppSelector((state) => state.irsdk);
  return (
    <div className={'text-white'}>
      <h1>Debug</h1>
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      <div>
        <pre>{JSON.stringify(telemetry, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Debug;
