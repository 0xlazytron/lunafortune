/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader__logo">
        <img src="/assets/images/logo/logo.svg" alt="Mr. Luna Casino" />
        <span style={{ fontSize: '48px', fontWeight: 'bold' }}>×</span>
        <img src="/assets/images/items/lunawheel.webp" alt="Luna Wheel 1000" style={{ height: '80px' }} />
      </div>
      <div className="loader__spinner" />
    </div>
  );
}

