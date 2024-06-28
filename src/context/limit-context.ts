'use client';
import { createContext } from 'react';

interface LimitContextValues {
  updateUsage: (usage: number) => void;
  dailyLimit: number;
  usedCharacters: number;
  remainingCharacters: number;
}

const LimitContext = createContext<LimitContextValues>({
  dailyLimit: 1000,
  usedCharacters: 0,
  remainingCharacters: 0,
  updateUsage: () => {},
});

export default LimitContext;

