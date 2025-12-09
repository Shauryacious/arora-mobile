import { useState } from 'react';
import LogoLoop, { LogoItem } from './LogoLoop';

// Logo component with error handling
const LogoWithFallback = ({ item }: { item: LogoItem }) => {
  const [hasError, setHasError] = useState(false);

  if ('node' in item) {
    return <div className="flex items-center justify-center min-w-[120px]">{item.node}</div>;
  }

  if (hasError || !item.src) {
    const brandName = item.alt || item.title || 'Logo';
    const isLargeText = ['Oppo', 'Vivo', 'Realme'].includes(brandName);
    
    // Brand-specific font styles
    const getBrandStyle = (name: string) => {
      switch (name) {
        case 'Oppo':
          return { fontFamily: "'Poppins', sans-serif", fontWeight: 600 };
        case 'Vivo':
          return { fontFamily: "'Roboto', sans-serif", fontWeight: 500 };
        case 'Realme':
          return { fontFamily: "'Montserrat', sans-serif", fontWeight: 600 };
        default:
          return {};
      }
    };
    
    return (
      <div className="flex items-center justify-center min-w-[120px]">
        <span 
          className={`text-white font-bold ${isLargeText ? 'text-2xl' : 'text-lg'}`}
          style={getBrandStyle(brandName)}
        >
          {brandName}
        </span>
      </div>
    );
  }

  const logoHeight = item.height || 'var(--logoloop-logoHeight)';
  const heightStyle = typeof logoHeight === 'number' ? `${logoHeight}px` : logoHeight;

  return (
    <div className="flex items-center justify-center min-w-[120px]">
      <img
        className="w-auto block object-contain brightness-0 invert max-w-[120px]"
        style={{ height: heightStyle }}
        src={item.src}
        alt={item.alt ?? ''}
        title={item.title}
        width={item.width}
        height={item.height}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

// Local logo SVGs stored in public/logos directory
// Using text fallbacks for logos that may not be available
const mobileBrandLogos: LogoItem[] = [
  {
    src: '/logos/apple.svg',
    alt: 'Apple',
    title: 'Apple',
    width: 48,
    height: 48,
  },
  {
    node: (
      <span 
        className="text-white font-bold text-2xl"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800 }}
      >
        Oppo
      </span>
    ),
    title: 'Oppo',
    ariaLabel: 'Oppo',
  },
  {
    src: '/logos/samsung.svg',
    alt: 'Samsung',
    title: 'Samsung',
    width: 100,
    height: 100,
  },
  {
    src: '/logos/google.svg',
    alt: 'Google',
    title: 'Google',
    width: 48,
    height: 48,
  },
  {
    src: '/logos/oneplus.svg',
    alt: 'OnePlus',
    title: 'OnePlus',
    width: 48,
    height: 48,
  },
  {
    node: (
      <span 
        className="text-white font-bold text-2xl"
        style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 800 }}
      >
        Vivo
      </span>
    ),
    title: 'Vivo',
    ariaLabel: 'Vivo',
  },
  {
    src: '/logos/xiaomi.svg',
    alt: 'Xiaomi',
    title: 'Xiaomi',
    width: 48,
    height: 48,
  },

  {
    node: (
      <span 
        className="text-white font-bold text-2xl"
        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
      >
        Realme
      </span>
    ),
    title: 'Realme',
    ariaLabel: 'Realme',
  },
  {
    src: '/logos/nothing.svg',
    alt: 'Nothing',
    title: 'Nothing',
    width: 48,
    height: 48,
  },
  {
    src: '/logos/motorola.svg',
    alt: 'Motorola',
    title: 'Motorola',
    width: 48,
    height: 48,
  },
  {
    src: '/logos/nokia.svg',
    alt: 'Nokia',
    title: 'Nokia',
    width: 80,
    height: 80,
  },
  {
    src: '/logos/sony.svg',
    alt: 'Sony',
    title: 'Sony',
    width: 80,
    height: 80,
  },
];

export function MobileBrandLogoLoop() {
  return (
    <div className="relative w-full py-16 bg-black">
      <LogoLoop
        logos={mobileBrandLogos}
        speed={80}
        direction="left"
        logoHeight={48}
        gap={48}
        pauseOnHover
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Popular mobile brands"
        className="h-[120px]"
        renderItem={(item) => <LogoWithFallback item={item} />}
      />
    </div>
  );
}
