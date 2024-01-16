import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import FontSizeChanger from './FontSizeChanger';
import SelectColor from './SelectColor';
import SiderHeader from './SiderHeader';
import SideFooterContent from './SideFooterContent';

interface SidebarProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  fontSize: number;
  onFontSizeChange: (newSize: number) => void;
  onColorChange: (colorType: string, color: string) => void;
  isOpen: boolean;
  closeSidebar: () => void;
  handleTextAlignmentChange: (alignment: CSSProperties['textAlign']) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  inputText,
  setInputText,
  fontSize,
  onFontSizeChange,
  onColorChange,
  isOpen,
  closeSidebar,
  handleTextAlignmentChange, 
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

 

  const handleSidebarInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };


  const handleFontSizeChange = (newSize: number) => {
    onFontSizeChange(newSize);
  };

  const handleColorChange = (colorType: string, color: string) => {
    onColorChange(colorType, color);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar(); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeSidebar]);
  const [footerName, setFooterName] = useState<string>('Hassan khan');
  const handleFooterNameChange = (newName: string) => {
    setFooterName(newName);
  };
  return (
    <div
      ref={sidebarRef}
      className={`h-screen w-1/6 fixed top-0 right-0 bg-gray-200 transform z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out shadow-lg`}
    >
   <SiderHeader
        inputText={inputText}
        fontSize={fontSize}
        handleSidebarInputChange={handleSidebarInputChange}
        handleFontSizeChange={handleFontSizeChange}
        handleColorChange={handleColorChange}
        handleTextAlignmentChange={handleTextAlignmentChange} 
      />
   
     
    </div>
  );
};

export default Sidebar;
