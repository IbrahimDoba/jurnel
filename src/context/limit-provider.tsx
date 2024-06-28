'use client';

import { useEffect, useState } from 'react';
import LimitContext from './limit-context';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux/store';

function LimitProvider({ children }: { children: React.ReactNode }) {
  const { subscription } = useSelector((state: IRootState) => state.subscription);

  const dailyLimit = 1000; // you can set this from your redux store or backend, the editor limit defaults to 0 which is falsy so it is ignored, so for unlimited subs you can just pass null or undefined or 0
  
  
  const [usedCharacters, setUsedCharacters] = useState(0);

  const updateUsage = (charactersUsed: number) => {
    setUsedCharacters(
      (prevUsedCharacters) => prevUsedCharacters + charactersUsed
    );
  };

  useEffect(() => {
    if (usedCharacters >= dailyLimit) {
      console.log('Daily limit exhausted');
    } else {
      console.log(
        'User has',
        dailyLimit - usedCharacters,
        'characters left today'
      );
    }
  }, [usedCharacters]);

  const LimitContextValues = {
    dailyLimit,
    usedCharacters,
    updateUsage,
    remainingCharacters: dailyLimit - usedCharacters, 
  };

  return (
    <LimitContext.Provider value={LimitContextValues}>
      {children}
    </LimitContext.Provider>
  );
}

export default LimitProvider;
