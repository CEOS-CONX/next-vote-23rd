'use client';

import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  if (label) {
    return (
      <div className="flex items-center justify-between">
        <span className="max-w-[68px] text-subhead-bold text-black md:max-w-none">{label}</span>
        <div className="w-64 md:w-[368px]">
          <div className="border-b border-black p-3">
            <input
              className={`w-full text-body1-med text-foreground placeholder:text-placeholder outline-none ${className}`}
              style={{ fontFeatureSettings: "'case' on" }}
              {...props}
            />
          </div>
          {error && (
            <p className="mt-1 text-body2 text-error" style={{ fontFeatureSettings: "'case' on" }}>
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border border-black p-3">
        <input
          className={`w-full text-subhead text-foreground placeholder:text-placeholder outline-none ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-body2 text-error" style={{ fontFeatureSettings: "'case' on" }}>
          {error}
        </p>
      )}
    </div>
  );
}
