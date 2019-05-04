import React, { useState, useEffect, useRef } from 'react';
import { ZeroToOneHundred } from '../ProgressBar/types';
import ProgressBar from '../ProgressBar';

export default function ProgressBarLoader() {
  const [value, setValue] = useState<ZeroToOneHundred>(0);
  const intervalRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(value => (value < 100 ? value + 2 : value) as ZeroToOneHundred);
    }, 10);
    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (value === 100) {
      clearInterval(intervalRef.current);
    }
  }, [value]);

  return <ProgressBar value={value} />;
}
