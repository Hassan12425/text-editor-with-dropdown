// Modal component
import { Editor } from '@/app/text-editor';
import React, { useState } from 'react';


interface ModalProps {
  closeModal: () => void;
  addEditor: () => void;
  handleImageUpload: (file: File | null) => void;
  setSelectedSectionType: React.Dispatch<React.SetStateAction<string | null>>;
}

const Modal: React.FC<ModalProps> = ({ closeModal, addEditor, handleImageUpload, setSelectedSectionType }) => {
  const [image, setImage] = useState<File | null>(null);
  const [editorAdded, setEditorAdded] = useState<boolean>(false);
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDisplayImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImage(file);
      handleImageUpload(file);
      setSelectedSectionType('IMAGE'); 
    }
  };

  const handleAddEditor = () => {
    addEditor();
    setEditorAdded(true);
    setSelectedSectionType('EDITOR'); 
  };

  return (
    <div className="modal w-[729px] h-auto border border-dashed border-blue-800 m-auto">
    <div className="modal-content p-6">
      <div className='flex items-center justify-between'>
        <h2 className='flex-1 text-center font-semibold'>Add a new Section</h2>
        <img onClick={closeModal} className='w-3 mr-6 cursor-pointer' src="/images/close.png" alt="" />
      </div>
      <div className="flex flex-col md:flex-row justify-center">
        <div className='m-2 md:w-1/6  shadow-lg bg-white p-6 rounded-lg flex flex-col justify-center text-center items-center'>
          <img className='w-6 mb-1' src="/images/texticon.png" alt="" />
          <button onClick={handleAddEditor}>Text</button>
        </div>
        <div className='m-2 md:w-1/6 h-auto shadow-lg bg-white p-6 rounded-lg flex flex-col justify-center text-center items-center'>
          <img className='w-6 mb-1' src="/images/imageicon.png" alt="" />
          <input className='hidden' type="file" id="actual-btn" onChange={handleImageChange} />
          <label htmlFor="actual-btn" className='cursor-pointer'>Image</label>
        </div>
      </div>
              
      {editorAdded && <Editor text={inputText} setInputText={setInputText} />}
    </div>
  </div>
  
  );
};

export default Modal;
