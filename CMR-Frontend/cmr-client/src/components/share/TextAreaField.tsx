'use client';

import React from 'react';

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
}

export default function TextAreaField({
  value,
  ...props
}: TextAreaFieldProps) {
  return (
    <textarea
      {...props}
      value={value ?? ''}
      className="w-full border rounded-lg px-3 py-2 text-sm
                 focus:ring-2 focus:ring-blue-300 outline-none"
    />
  );
}
