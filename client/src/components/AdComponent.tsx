import React, { useEffect, useRef } from 'react';

export type AdFormat = 'banner' | 'rectangle' | 'leaderboard' | 'skyscraper' | 'native';
export type AdPosition = 'top' | 'bottom' | 'sidebar' | 'in-content' | 'sticky';

interface AdComponentProps {
  format: AdFormat;
  position: AdPosition;
  className?: string;
  id?: string;
  bgColor?: string;
  adCode?: string;
  fallbackAd?: React.ReactNode;
  lazyLoad?: boolean;
}

const AdComponent: React.FC<AdComponentProps> = ({
  format,
  position,
  className = '',
  id = `ad-${format}-${position}-${Math.random().toString(36).substring(2, 9)}`,
  bgColor = 'bg-gray-50',
  adCode,
  fallbackAd,
  lazyLoad = true
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // Format-specific styling
  const formatStyles = {
    'banner': 'w-full h-[90px] md:h-[90px]',
    'rectangle': 'w-[300px] h-[250px]',
    'leaderboard': 'w-full h-[90px] md:h-[90px]',
    'skyscraper': 'hidden lg:block w-[160px] h-[600px]',
    'native': 'w-full',
  };

  // Position-specific styling
  const positionStyles = {
    'top': 'mt-0 mb-4',
    'bottom': 'mt-4 mb-0',
    'sidebar': 'my-4',
    'in-content': 'my-6',
    'sticky': 'sticky top-20'
  };

  useEffect(() => {
    // Function to load ad
    const loadAd = () => {
      if (adRef.current && adCode) {
        adRef.current.innerHTML = adCode;
        
        // Execute any scripts in the ad code
        const scripts = adRef.current.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
          const script = scripts[i];
          const scriptClone = document.createElement('script');
          
          // Copy all attributes
          Array.from(script.attributes).forEach(attr => {
            scriptClone.setAttribute(attr.name, attr.value);
          });
          
          // Copy the content
          scriptClone.text = script.text;
          
          // Replace the original with the clone
          script.parentNode?.replaceChild(scriptClone, script);
        }
      }
    };

    // Setup intersection observer for lazy loading
    if (lazyLoad) {
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadAd();
            // Disconnect after loading
            observer.current?.disconnect();
          }
        });
      }, { rootMargin: '200px' });

      if (adRef.current) {
        observer.current.observe(adRef.current);
      }

      return () => {
        observer.current?.disconnect();
      };
    } else {
      // If not lazy loading, just load immediately
      loadAd();
    }
  }, [adCode, lazyLoad]);

  return (
    <div 
      id={id}
      className={`ad-container ${formatStyles[format]} ${positionStyles[position]} ${bgColor} ${className} overflow-hidden relative rounded-md border border-gray-200`}
    >
      <div ref={adRef} className="w-full h-full flex items-center justify-center">
        {/* If no ad code is provided, show fallback ad or placeholder */}
        {!adCode && (
          <>
            {fallbackAd || (
              <div className="text-center p-4 w-full">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Advertisement</div>
                <div className="bg-gray-200 animate-pulse w-full h-16 rounded"></div>
                <div className="mt-2 text-xs text-gray-400">Loading ad...</div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* "Advertisement" label for compliance */}
      <div className="absolute top-0 left-0 text-[10px] text-gray-400 px-1">
        Advertisement
      </div>
    </div>
  );
};

export default AdComponent;