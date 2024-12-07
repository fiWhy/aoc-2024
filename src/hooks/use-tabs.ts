import { tabs } from '@/constants';
import { useState } from 'react';

export const useTabs = () => {
  const [tab, setTab] = useState(tabs[0]);
  return {
    tab,
    setTab,
  };
};
