'use client';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <Next13ProgressBar height="2px" color="red" options={{ showSpinner: false }} showOnShallow />
    </>
  );
};

export default Providers;