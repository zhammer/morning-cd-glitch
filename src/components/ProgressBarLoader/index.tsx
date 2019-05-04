import React, { useState, useEffect } from 'react';
import { ZeroToOneHundred } from '../ProgressBar/types';
import ProgressBar from '../ProgressBar';

export default function ProgressBarLoader() {
  const [value, setValue] = useState<ZeroToOneHundred>(0);
  const [full, setFull] = useState(false);
  useEffect(() => {
    if (!full) {
      const interval = setInterval(() => {
        setValue(value => {
          if (value < 100) return Math.min(value + 2, 100) as ZeroToOneHundred;
          setFull(true);
          return value;
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [full]);

  return <ProgressBar value={value} />;
}
