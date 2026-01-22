'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export const useGSAP = () => {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    contextRef.current = gsap.context(() => {});

    return () => {
      contextRef.current?.revert();
    };
  }, []);

  return contextRef;
};
