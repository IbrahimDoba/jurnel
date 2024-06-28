import LimitContext from '@/context/limit-provider';
import { ReduxProvider } from '@/redux/provider';
import React from 'react';

const ReduxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <ReduxProvider>
        <LimitContext>{children}</LimitContext>
      </ReduxProvider>
    </html>
  );
};

export default ReduxWrapper;
