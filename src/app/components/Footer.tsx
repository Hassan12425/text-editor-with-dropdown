import React, { useState } from 'react';
import FooterSidebar from './FooterSidebar';

const Footer: React.FC = () => {
  const [name, setName] = useState<string>('Hassan khan');
  const [address, setAddress] = useState<string>('Abbottabad');
  const [number, setNumber] = useState<string>('03484827891');
  const [email, setEmail] = useState<string>('Hassankhan12425@gmail.com');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('transparent');
  const [textColor, setTextColor] = useState<string>('black');

  const handleColorChange = (colorType: string, color: string) => {
    if (colorType === 'background') {
      setBackgroundColor(color);
    } else if (colorType === 'text') {
      setTextColor(color);
    }
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleInputChange = (type: string, value: string) => {
    switch (type) {
      case 'name':
        setName(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'number':
        setNumber(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="text-center">
      <div
        className={`p-4 mx-auto w-96 h-240 border border-gray-300 flex justify-center items-center`}
        style={{
          padding: '15px',
          width: '728px',
          height: '150px',
          border: '1px solid #ccc',
          borderTop: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColor,
        
        }}
        onClick={openSidebar}
      >
        <FooterSidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} onInputChange={handleInputChange} onColorChange={handleColorChange} />
        <div className='flex flex-col'
          style={{
            color: textColor,
          }}
        >
          <div>{name}</div>
          <div>{address}</div>
          <div>{number}</div>
          <div>{email}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
