'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

// Google AdSense credentials
const ADSENSE_CLIENT_ID = "pub-8445740004362698"; // Publisher ID
const ADSENSE_AD_SLOT = "1234567890";     // Replace with your actual ad slot when available

export default function AdSection() {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  // Initialize ads when component mounts
  useEffect(() => {
    // Check if AdSense is loaded
    if (window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (error) {
        console.error('AdSense error:', error);
        setAdError(true);
      }
    }
  }, []);

  return (
    <>
      <Script 
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onLoad={() => {
          console.log('AdSense script loaded successfully');
          setAdLoaded(true);
        }}
        onError={() => {
          console.error('Failed to load AdSense script');
          setAdError(true);
        }}
      />
      
      <div className="w-full min-h-[90px] bg-gray-100 mb-8">
        {adError ? (
          <div className="flex items-center justify-center h-full p-4 text-gray-500 text-sm">
            <p>Advertisement placeholder - AdSense not configured</p>
          </div>
        ) : (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={ADSENSE_AD_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </>
  );
}
