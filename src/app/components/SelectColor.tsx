import React from 'react';
import DropDown from './common/DropDown';

interface SelectColorProps {
  onColorChange: (colorType: string, color: string) => void;
}

const SelectColor: React.FC<SelectColorProps> = ({ onColorChange }) => {
  const handleColorSelection = (colorType: string, color: string) => {
    onColorChange(colorType, color);
  };

  const backgroundColors = ['transparent','blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'magenta', 'teal', 'lime', 'olive', 'brown', 'navy', 'maroon', 'black', 'gray', 'silver', 'gold', 'indigo'];
  const textColors = ['black', 'white', 'gray', 'silver', 'gold', 'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'magenta', 'teal', 'lime', 'olive', 'brown', 'navy', 'maroon'];
  const linkColors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'magenta', 'teal'];

  const handleBackgroundChange = (selectedColor: string) => {
    handleColorSelection('background', selectedColor);
  };

  const handleTextColorChange = (selectedColor: string) => {
    handleColorSelection('text', selectedColor);
  };

  return (
    <div>
     
   <DropDown onBackgroundChange={handleTextColorChange} backgroundColors={textColors} title='TextColor' />
   <DropDown onBackgroundChange={handleBackgroundChange} backgroundColors={backgroundColors} title='Background' />
    
    </div>
  );
};

export default SelectColor;
