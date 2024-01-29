import React from 'react';

interface CustomButtonProps {
  iconSrc: string;
  position: string;
  onDelete?: () => void; 
  onClick?: () => void;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ iconSrc, position, onDelete, onClick,className }) => {
  const handleButtonClick = () => {
    if (onDelete) {
      onDelete();
    }
    if (onClick) {
      onClick(); 
    }
  };

  return (
    <div
    className={`absolute z-10 ${position} w-8 h-8 flex items-center justify-center ${className} `}
      onClick={handleButtonClick} 
    >
      <div className="w-full h-full bg-white  rounded-full overflow-hidden flex items-center justify-center  ">
        <img
          className="w-5 h-5 object-contain"
          src={iconSrc}
          alt="Button icon"
        />
      </div>
    </div>
  );
};

export default CustomButton;
