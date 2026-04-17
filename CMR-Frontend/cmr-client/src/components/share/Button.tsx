'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'secondary';
  size?: 'sm' | 'md';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'rounded-md text-xs font-medium transition-all duration-200';

  const sizes = {
    sm: 'px-2 py-1',
    md: 'px-4 py-2',
  };

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700',
    success:
      'bg-green-600 text-white hover:bg-green-700',
    danger:
      'bg-red-600 text-white hover:bg-red-700',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}