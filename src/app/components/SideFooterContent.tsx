import React, { useState } from 'react';
import DropDown from './common/DropDown';
import HeaderTitle from './common/HeaderTitle';

interface SideFooterContentProps {
  onColorChange: (colorType: string, color: string) => void;
  name: string;
  address: string;
  number: string;
  email: string;
  onInputChange: (type: string, value: string) => void;
}

const SideFooterContent: React.FC<SideFooterContentProps> = ({
  onColorChange,
  name,
  address,
  number,
  email,
  onInputChange,

}) => {
  
  const [nameChecked, setNameChecked] = useState<boolean>(false);
  const [addressChecked, setAddressChecked] = useState<boolean>(false);
  const [numberChecked, setNumberChecked] = useState<boolean>(false);
  const [emailChecked, setEmailChecked] = useState<boolean>(false);


  const textColors = ['black', 'white', 'gray', 'silver', 'gold', 'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'magenta', 'teal', 'lime', 'olive', 'brown', 'navy', 'maroon'];
  const backgroundColors = ['transparent','blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'magenta', 'teal', 'lime', 'olive', 'brown', 'navy', 'maroon', 'black', 'gray', 'silver', 'gold', 'indigo'];

  const handleInputChange = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onInputChange(type, value);
  };
  const handleColorSelection = (colorType: string, color: string) => {
    onColorChange(colorType, color);
  };
  const handleBackgroundChange = (selectedColor: string) => {
    handleColorSelection('background', selectedColor);
  };
    const handleTextColorChange = (selectedColor: string) => {
    handleColorSelection('text', selectedColor);
  };

  return (
    <div>
<HeaderTitle title='Footer'/>
      <div className="">
      <div className="mb-3 mt-3 border-b border-gray-300">
        <label className="block text-gray-700 text-sm font-bold mb- float-left" >
        <input
              className="mr-2 ml-2"
              type="checkbox"
              checked={nameChecked}
              onChange={() => setNameChecked(!nameChecked)}
            />
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => handleInputChange('name', e)}
          disabled={!nameChecked}
          className="shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
            <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-2 float-left" >
           <input
              className="mr-2 ml-2"
              type="checkbox"
              checked={addressChecked}
              onChange={() => setAddressChecked(!addressChecked)}
            />
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => handleInputChange('address', e)}
           disabled={!addressChecked}
          className="shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-2 float-left">
           <input
              className="mr-2 ml-2"
              type="checkbox"
              checked={numberChecked}
              onChange={() => setNumberChecked(!numberChecked)}
            />
          Number
        </label>
        <input
          type="text"
          id="number"
          value={number}
          onChange={(e) => handleInputChange('number', e)}
           disabled={!numberChecked}
          className="shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-2 float-left">
           <input
              className="mr-2 ml-2"
              type="checkbox"
              checked={emailChecked}
              onChange={() => setEmailChecked(!emailChecked)}
            />
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => handleInputChange('email', e)}
           disabled={!emailChecked}
          className="shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      </div>
  <h2 className='font-semibold flex items-start ml-2 mb-2'>Style</h2>
       <DropDown onBackgroundChange={handleBackgroundChange} backgroundColors={backgroundColors} title='Background' />
       <DropDown onBackgroundChange={handleTextColorChange} backgroundColors={textColors} title='TextColor' />

      </div>
    </div>
  );
};

export default SideFooterContent;
