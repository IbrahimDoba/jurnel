import LimitContext from '@/context/limit-context';
import { useContext } from 'react';

function DailyLimitProgressbar() {
  const { dailyLimit, usedCharacters } = useContext(LimitContext);

  const percentage = Math.round((100 / dailyLimit) * usedCharacters)

  return (
    <div
      className={`p-2 bg-white rounded-lg border border-emerald-100`}
    >
      <svg
        height='20'
        width='20'
        viewBox='0 0 20 20'
        className='character-count__graph'
      >
        <circle r='10' cx='10' cy='10' fill='#eefcf6' />
        <circle
          r='5'
          cx='10'
          cy='10'
          fill='transparent'
          stroke='#10b77f'
          strokeWidth='10'
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform='rotate(-90) translate(-20)'
        />
        <circle r='6' cx='10' cy='10' fill='white' />
      </svg>
      {/* <p className='text-xs text-accent font-semibold'>
        {usedCharacters}/{dailyLimit} today
      </p> */}
    </div>
  );
}

export default DailyLimitProgressbar;
