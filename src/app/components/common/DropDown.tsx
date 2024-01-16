import React, { useState } from 'react';

interface DropDownProps {
  onBackgroundChange: (color: string) => void;
  backgroundColors: string[];
  title: string;
}

const DropDown: React.FC<DropDownProps> = ({ onBackgroundChange, backgroundColors,title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('black');

  const handleBackgroundChange = (color: string) => {
    setSelectedColor(color);
    onBackgroundChange(color);
    closeDropDown();
  };

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropDown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative mb-3 w-3/12 ">
      <div className="flex items-center float-left">
        <div className="border rounded p-1 relative" onClick={toggleDropDown}>
          <div className="flex justify-between items-center">
            <div className={'w-9 h-6 rounded-md border border-gray-300 '} style={{ backgroundColor: selectedColor }}></div>
          </div>
          {isOpen && (
            <div className="absolute z-10 top-full left-0 max-w-16 overflow-y-auto max-h-48 bg-white border rounded mt-1 ">
              {backgroundColors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center p-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleBackgroundChange(color)}
                >
                  <div className="w-9 h-6 rounded-md border border-gray-300" style={{ backgroundColor: color }}></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <span className='ml-2'>{title}</span>
      </div>
    </div>
  );
};

export default DropDown;
