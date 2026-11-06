'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';

interface AuraImageProps extends ImageProps {
  containerClassName?: string;
}

export default function AuraImage({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
  ...props
}: AuraImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={clsx('relative overflow-hidden bg-neutral-100', containerClassName)}>
      {/* Smooth Shimmer Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-200/50 via-neutral-100/80 to-neutral-200/50 animate-pulse z-0 pointer-events-none" />
      )}

      {/* Image with zero-delay transition on load */}
      <Image
        src={src}
        alt={alt}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className={clsx(
          'transition-all duration-300 ease-out z-10',
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[1.02] blur-[2px]',
          className
        )}
        {...props}
      />
    </div>
  );
}
