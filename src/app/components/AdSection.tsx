'use client';

import Script from 'next/script';
import { useEffect, useState, useRef } from 'react';

// Add AdSense type definition
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// Google AdSense credentials
const ADSENSE_CLIENT_ID = "pub-8445740004362698"; // Publisher ID
const ADSENSE_AD_SLOT = "1234567890";     // Replace with your actual ad slot when available

interface AdSectionProps {
  position?: 'top' | 'bottom' | 'sidebar';
}

export default function AdSection({ position = 'top' }: AdSectionProps) {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [adBlocked, setAdBlocked] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  // Initialize with null to fix TypeScript error
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if ad blocker is active
  useEffect(() => {
    // Set a timeout to check if ads loaded
    timeoutRef.current = setTimeout(() => {
      // If adLoaded is still false after timeout, likely blocked
      if (!adLoaded && !adError) {
        setAdBlocked(true);
      }
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [adLoaded, adError]);

  // Initialize ads when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (error) {
        console.error('AdSense error:', error);
        setAdError(true);
      }
    }
  }, []);

  // Add intersection observer to load ads only when visible
  useEffect(() => {
    if (!adRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !adLoaded && !adError && !adBlocked) {
            // When ad container is visible, try to load the ad
            if (typeof window !== 'undefined' && window.adsbygoogle) {
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setAdLoaded(true);
              } catch (error) {
                console.error('AdSense error:', error);
                setAdError(true);
              }
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    observer.observe(adRef.current);

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current);
      }
    };
  }, [adLoaded, adError, adBlocked]);

  // Determine ad container classes based on position
  const getContainerClasses = () => {
    const baseClasses = "w-full bg-gray-100 rounded overflow-hidden";
    
    switch (position) {
      case 'top':
        return `${baseClasses} min-h-[90px] mb-8`;
      case 'bottom':
        return `${baseClasses} min-h-[90px] mt-8`;
      case 'sidebar':
        return `${baseClasses} min-h-[250px]`;
      default:
        return `${baseClasses} min-h-[90px] my-4`;
    }
  };

  return (
    <>
      <Script 
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onLoad={() => {
          setAdLoaded(true);
        }}
        onError={() => {
          console.error('Failed to load AdSense script');
          setAdError(true);
        }}
      />
      
      <div ref={adRef} className={getContainerClasses()} aria-hidden="true">
        {adError || adBlocked ? (
          <div className="flex items-center justify-center h-full p-4 text-gray-500 text-sm">
            <p>{adBlocked ? 'Please disable ad blocker to support this site' : 'Advertisement placeholder'}</p>
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
