import React, { CSSProperties, useState } from 'react';
import Sidebar from './Sidebar'; // Import your Sidebar component

const TextField: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Online Store');
  const [fontSize, setFontSize] = useState<number>(16);
  const [backgroundColor, setBackgroundColor] = useState<string>('transparent');
  const [textColor, setTextColor] = useState<string>('black');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); 
  const [textAlignment, setTextAlignment] = useState<CSSProperties['textAlign']>('center');

  const handleDivInputChange = (event: React.FormEvent<HTMLDivElement>) => {
    const text = event.currentTarget.textContent || '';
    setInputText(text);
  };

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
  };

  const handleColorChange = (colorType: string, color: string) => {
    if (colorType === 'background') {
      setBackgroundColor(color);
    } else if (colorType === 'text') {
      setTextColor(color);
    }
  };

  const handleTextAlignmentChange = (alignment: CSSProperties['textAlign']) => {
    setTextAlignment(alignment);
  };
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false); 
  };

  return (
    <div>
      <div
        className={`text-${fontSize} p-4 w-96 mx-auto h-24 border border-gray-300 mb-0`}
        contentEditable={false}
        style={{
          fontSize: `${fontSize}px`,
          padding: '15px',
          width: '729px',
          textAlign: textAlignment,
          margin: 'auto',
          height: '96px',
          border: '1px solid #ccc',
          backgroundColor: backgroundColor,
          color: textColor,
        }}
        onClick={openSidebar} 
        onBlur={handleDivInputChange}
        dangerouslySetInnerHTML={{ __html: inputText }}
      />

      <Sidebar
        inputText={inputText}
        setInputText={setInputText}
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
        onColorChange={handleColorChange}
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar} 
        handleTextAlignmentChange={handleTextAlignmentChange} 
      />
    </div>
  );
};

export default TextField;
