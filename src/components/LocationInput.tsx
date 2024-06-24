import React, { useState, ChangeEvent, useEffect } from 'react';
import useAutocomplete from '@/hooks/useAutocomplete';

type LocationInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: string | React.ReactNode;
};

const LocationInput: React.FC<LocationInputProps> = ({ label, value, onChange, icon }) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteSuggestions = useAutocomplete(inputValue);

  useEffect(() => {
    setSuggestions(autocompleteSuggestions);
    setShowSuggestions(autocompleteSuggestions.length > 0);
  }, [autocompleteSuggestions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    onChange(inputValue);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="md:mt-8 mt-4 relative">
      <div className="text-sm leading-4 text-black md:block hidden">{label}</div>
      <div className="flex gap-3 p-4 mt-1.5 max-h-11 bg-white rounded-md border border-solid border-gray-200 items-center">
        {icon}
        <div className="flex-auto text-base font-semibold leading-5 text-gray-800">
          <input
            className="outline-none"
            value={inputValue}
            onChange={handleChange}
            placeholder={`Enter ${label}`}
          />
        </div>
      </div>
      {showSuggestions && (
        <ul className="absolute bg-white border border-gray-200 w-full max-h-60 overflow-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectSuggestion(suggestion.description)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
