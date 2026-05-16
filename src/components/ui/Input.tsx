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
        <span className="text-subhead-bold max-w-none text-black max-md:max-w-[68px]">{label}</span>
        <div className="w-[368px] max-md:w-64">
          <div className="border-b border-black p-3">
            <input
              className={`text-body1-med text-foreground placeholder:text-placeholder w-full outline-none ${className}`}
              style={{ fontFeatureSettings: "'case' on" }}
              {...props}
            />
          </div>
          {error && (
            <p className="text-body2 text-error mt-1" style={{ fontFeatureSettings: "'case' on" }}>
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
          className={`text-subhead text-foreground placeholder:text-placeholder w-full outline-none ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-body2 text-error mt-1" style={{ fontFeatureSettings: "'case' on" }}>
          {error}
        </p>
      )}
    </div>
  );
}
