import React, { useState, ChangeEvent } from 'react';


const FontSizeChanger: React.FC<{ fontSize: number; onFontSizeChange: (newSize: number) => void }> = ({
  fontSize,
  onFontSizeChange,
}) => {
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    onFontSizeChange(newSize);
  };

  return (
    <div className=''>
      <label className='w-100% float-left mb-1 ' htmlFor="fontSizeSlider">Text Size</label><br />
      <input
      className='w-3/4 float-left'
        type="range"
        id="fontSizeSlider"
        name="fontSizeSlider"
        min="16"
        max="45"
        step="1"
        value={fontSize}
        onChange={handleFontSizeChange}
      />
      <span>{fontSize}px</span>
    </div>
  );
};

export default FontSizeChanger;
