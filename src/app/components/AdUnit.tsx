'use client';

import { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  adSlot: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdUnit({ adSlot, style }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [isClient]);

  if (!isClient) {
    return <div className="w-full min-h-[90px] bg-gray-100" />;
  }

  return (
    <div className="w-full min-h-[90px] bg-gray-100">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="pub-8445740004362698"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
