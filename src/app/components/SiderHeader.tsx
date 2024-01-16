import React, { CSSProperties, useState } from 'react';
import FontSizeChanger from './FontSizeChanger';
import SelectColor from './SelectColor';
import HeaderTitle from './common/HeaderTitle';

interface SiderHeaderProps {
  inputText: string;
  fontSize: number;
  handleSidebarInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFontSizeChange: (newSize: number) => void;
  handleColorChange: (colorType: string, color: string) => void;
  handleTextAlignmentChange: (alignment: CSSProperties['textAlign']) => void;
}

const SiderHeader: React.FC<SiderHeaderProps> = ({
  inputText,
  fontSize,
  handleSidebarInputChange,
  handleFontSizeChange,
  handleColorChange,
  handleTextAlignmentChange,
}) => {
  const [activeAlignment, setActiveAlignment] = useState<CSSProperties['textAlign']>('center');

  const handleAlignmentClick = (alignment: CSSProperties['textAlign']) => {
    setActiveAlignment(alignment);
    handleTextAlignmentChange(alignment);
  };

  return (
    <div>
      <HeaderTitle title="Header" />
      <div className="p-4 border-b border-gray-300">
        <h2 className="mb-2 font-semibold flex items-start">Store Branding</h2>
        <input
          type="text"
          value={inputText}
          onChange={handleSidebarInputChange}
          className="w-full p-1 border-2 border-gray-300"
        />
      </div>
      {/* Text alignment & Font Changer Button */}

      <div className='border-b border-gray-300'>
        <div className='pt-4 pl-5'>
          <h3 className='flex items-start'> Alignment</h3>
        </div>
        <div className="flex justify-center items-center border border-double border-gray-300 w-5/6 m-auto rounded-lg mt-2">
         
          <div className={`w-1/3 p-2.5 ${activeAlignment === 'left' ? 'bg-gray-800' : ''}`} onClick={() => handleAlignmentClick('left')}>
            <svg xmlns="http://www.w3.org/2000/svg"
             width="16" height="16" fill="currentColor"
              className={`w-1/2 rounded-sm ${activeAlignment === 'left' ? 'text-white' : ''}`}
              viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>

          

          <div className={`w-1/3 p-2.5 ${activeAlignment === 'center' ? 'bg-gray-800' : ''}`} onClick={() => handleAlignmentClick('center')}>
            <svg xmlns="http://www.w3.org/2000/svg"
             width="16" height="16" fill="currentColor"
              className={`w-1/2 rounded-sm ${activeAlignment === 'center' ? 'text-white' : ''}`}
              viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />

            </svg>
          </div>

          <div className={`w-1/3 p-2.5 ${activeAlignment === 'right' ? 'bg-gray-800' : ''}`} onClick={() => handleAlignmentClick('right')}>
            <svg xmlns="http://www.w3.org/2000/svg"
             width="16" height="16" fill="currentColor"
              className={`w-1/2 rounded-sm ${activeAlignment === 'right' ? 'text-white' : ''}`}
              viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />

            </svg>
          </div>
        </div>
        <div className="mt-2 pb-3 px-4 ">
          <FontSizeChanger fontSize={fontSize} onFontSizeChange={handleFontSizeChange} />
        </div>
      </div>
      <div className="px-4 mt-6">
        <SelectColor onColorChange={handleColorChange} />
      </div>
    </div>
  );
};

export default SiderHeader;
