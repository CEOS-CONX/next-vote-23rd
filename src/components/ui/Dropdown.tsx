'use client';

import { useState, useRef, useEffect } from 'react';
import IconDropdown from '@/assets/icons/icon_dropdown.svg';

interface DropdownProps {
  label?: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function Dropdown({ label, placeholder, options, value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative flex flex-1 items-center gap-4">
      {label && (
        <span className="hidden shrink-0 text-subhead-bold text-black md:block">{label}</span>
      )}
      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between border-b border-foreground px-1.5 py-3"
          style={{ fontFeatureSettings: "'case' on" }}
        >
          <span className={`text-body1-med ${value ? 'text-foreground' : 'text-placeholder'}`}>
            {value || placeholder}
          </span>
          <IconDropdown className="shrink-0" />
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto border border-border bg-white shadow-lg">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-center text-body1-med hover:bg-gradient-end"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
