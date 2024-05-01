import React from 'react';

const StandingsWrapper = () => {
  const path = {
    f1: './F1Standings.tsx',
    acc: './ACCStandings.tsx'
  };

  const Comp = React.lazy(() => import(path['f1']));
  return (
    <div>
      <React.Suspense fallback={<div>loading</div>}>
        <Comp />
      </React.Suspense>
    </div>
  );
};

export default StandingsWrapper;
