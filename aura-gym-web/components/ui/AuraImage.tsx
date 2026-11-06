'use client';

import React from 'react';
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
  return (
    <div className={clsx('relative overflow-hidden bg-neutral-100', containerClassName)}>
      <Image
        src={src}
        alt={alt}
        unoptimized
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={clsx('transition-transform duration-500 ease-out', className)}
        {...props}
      />
    </div>
  );
}
