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
        <span className="text-subhead-bold block shrink-0 text-black max-md:hidden">{label}</span>
      )}
      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="border-foreground flex w-full items-center justify-between border-b px-1.5 py-3"
          style={{ fontFeatureSettings: "'case' on" }}
        >
          <span className={`text-body1-med ${value ? 'text-foreground' : 'text-placeholder'}`}>
            {value || placeholder}
          </span>
          <IconDropdown className="shrink-0" />
        </button>
        {isOpen && (
          <ul className="border-border absolute z-10 mt-1 max-h-48 w-full overflow-y-auto border bg-white shadow-lg">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="text-body1-med hover:bg-gradient-end w-full px-3 py-2 text-center"
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
