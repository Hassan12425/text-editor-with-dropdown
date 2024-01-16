import React from 'react';

interface HeaderTitleProps {
  title: string; 
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
  return (
    <div>
      <div className="mt-2 font-semibold px-4 py-2 border-b border-gray-300">
<div className='flex gap-14 items-center'>
<img className='w-4 h-4' src='images/back.png'/>
{title}
</div>

      </div>
    </div>
  );
};

export default HeaderTitle;
