import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export default function Button({ children, fullWidth = true, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`cursor-pointer bg-btn-dark px-3 py-4 font-suite text-headline4 text-white ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
