// src/components/DropdownSortBy.tsx
import React, { useState } from 'react';

interface Option {
  value: string; // The value used for the sort
  label: string; // The display label shown in the dropdown
}

interface DropdownSortByProps {
  value: string; // This represents the currently selected option's value
  onChange: (value: string) => void; // Function to call when the selected option changes
  options: Option[]; // Array of options to display
}

const DropdownSortBy: React.FC<DropdownSortByProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    onChange(option.value); // Update the selected value
    setIsOpen(false);
  };

  // Find the label corresponding to the current value
  const selectedLabel = value === '' ? 'Sort by' : options.find(option => option.value === value)?.label || '';

  return (
    <div className="relative">
      <div 
        className="border rounded-md p-2 px-4 w-auto cursor-pointer bg-white flex items-center justify-between dark:bg-black dark:text-white "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel}</span> {/* Show "Sort by" if no value is selected */}
        {/* Arrow Icon */}
        <span className={`ml-2 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>
      {isOpen && (
        <ul className="absolute border rounded-md mt-1 w-full bg-white z-10 dark:bg-black dark:text-white">
          {options.map(option => (
            <li 
              key={option.value} 
              className="p-2 hover:bg-primary hover:text-white cursor-pointer"
              onClick={() => handleOptionClick(option)} // Pass the entire option to handleOptionClick
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSortBy;
