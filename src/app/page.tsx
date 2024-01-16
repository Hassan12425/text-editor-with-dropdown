'use client'

// Import necessary modules and components
import React, { useState } from "react";
import Footer from "./components/Footer";
import TextField from "./components/TextField";
import Modal from "./components/common/Model";
import EditorSidebar from "./components/EditorSidebar";
import CustomButton from "./components/common/CustomButton";
import ImageSection from "./components/ImageSection";
import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { Editor } from "./text-editor";
import CombineComponent from "./components/CombineComponent";
import DragAndDrop from "./components/CombineComponent";


interface EditorItem {
  type: 'EDITOR';
  index: number;
}

interface ImageItem {
  type: 'IMAGE';
  index: number;
  image: string;
  backgroundColor: string;
}

const Home: React.FC = React.memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorCount, setEditorCount] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [backgroundColors, setBackgroundColors] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSectionType, setSelectedSectionType] = useState<string | null>(null);


  const [isEditorHovered, setIsEditorHovered] = useState<boolean[]>(Array(editorCount).fill(false));
  const [isImageHovered, setIsImageHovered] = useState<boolean[]>([]);
  const [isHoveredAddEditor, setIsHoveredAddEditor] = useState(false);
  const [isHoveredAddButton, setIsHoveredAddButton] = useState(false);


  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    openSidebar();
  };
  const handleBackgroundChange = (color: string) => {
    if (selectedImageIndex !== null) {
      const updatedColors = [...backgroundColors];
      updatedColors[selectedImageIndex] = color;
      setBackgroundColors(updatedColors);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const addEditor = () => {
    setEditorCount(prevCount => prevCount + 1);
    setIsEditorHovered(prevState => [...prevState, false]);
    closeModal();
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prevImages => [...prevImages, reader.result as string]);
        setBackgroundColors(prevColors => [...prevColors, 'transparent']);
        setIsImageHovered(prevState => [...prevState, false]);
      };
      reader.readAsDataURL(file);
    }
    closeModal();
  };
  const addNewEditorSection = () => {
    setEditorCount(prevCount => prevCount + 1);
    setIsEditorHovered(prevState => [...prevState, false]);// Reset hover state for the new editor
  };

  const deleteEditorSection = (indexToDelete: number) => {
    setEditorCount(prevCount => prevCount - 1);
    const updatedEditorHoverState = [...isEditorHovered];
    updatedEditorHoverState.splice(indexToDelete, 1);
    setIsEditorHovered(updatedEditorHoverState);
  };

  const addNewImageSection = () => {
    const newImage = uploadedImages[uploadedImages.length - 1];
    setUploadedImages(prevImages => [...prevImages, newImage]);
    setBackgroundColors(prevColors => [...prevColors, 'transparent']);
    setIsImageHovered(prevState => [...prevState, false]); // Reset hover state for the new image
  };

  const deleteImageSection = (indexToDelete: number) => {
    setUploadedImages(prevImages => prevImages.filter((_, index) => index !== indexToDelete));
    setBackgroundColors(prevColors => prevColors.filter((_, index) => index !== indexToDelete));
    const updatedImageHoverState = [...isImageHovered];
    updatedImageHoverState.splice(indexToDelete, 1);
    setIsImageHovered(updatedImageHoverState);
  };

  const combinedSections: (EditorItem | ImageItem)[] = [
    ...Array(editorCount).fill(2).map((_, index) => ({
      type: 'EDITOR',
      index,
    }) as EditorItem),
    ...uploadedImages.map((image, index) => ({
      type: 'IMAGE',
      index,
      image,
      backgroundColor: backgroundColors[index],
    }) as ImageItem),
  ];
  console.log(combinedSections)

  const editorSections: JSX.Element[] = [];
  const imageSections: JSX.Element[] = [];

  combinedSections.forEach((section, index) => {
    if (section.type === 'EDITOR') {
      editorSections.push(
        <div
          key={index}
          className="relative w-[840px] m-auto"
          onMouseEnter={() =>
            setIsEditorHovered((prevState) =>
              prevState.map((val, i) => (i === section.index ? true : val))
            )
          }
          onMouseLeave={() =>
            setIsEditorHovered((prevState) =>
              prevState.map((val, i) => (i === section.index ? false : val))
            )
          }
        >
          <div
            className={`absolute`}
            onMouseEnter={() => setIsHoveredAddEditor(true)}
            onMouseLeave={() => setIsHoveredAddEditor(false)}
          >
            <div className={`flex absolute left-[390px] -top-4 w-8 h-8  z-10 items-center justify-center `}>
              {isHoveredAddEditor && (
                <button
                  className="w-8 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal();
                  }}
                >
                  <img
                    className="w-full h-full object-contain"
                    src="/images/add.png"
                    alt="Button icon"
                  />
                </button>
              )}
            </div>
          </div>
          {isEditorHovered[index] && (
            <div>
              <CustomButton position="top-0 left-[0px]" iconSrc="/images/drag.png" />
              <CustomButton position="top-0 right-5" onClick={addNewEditorSection} iconSrc="/images/copy.png" />
              <CustomButton position="top-0 right-[-20px]" onDelete={() => deleteEditorSection(index)} iconSrc="/images/delete.png" />
            </div>
          )}
          <Editor text={inputText} setInputText={setInputText} />

        </div>

      );
    } else if (section.type === 'IMAGE') {
      const imageItem = section as ImageItem;
      imageSections.push(
        <ImageSection
          key={index}
          image={imageItem.image}
          index={imageItem.index}
          backgroundColor={imageItem.backgroundColor}
          isImageHovered={isImageHovered[imageItem.index]}
          handleImageClick={handleImageClick}
          addNewImageSection={addNewImageSection}
          deleteImageSection={deleteImageSection}
          setIsImageHovered={setIsImageHovered}
          isHoveredAddButton={isHoveredAddButton}
          setIsHoveredAddButton={setIsHoveredAddButton}
          openModal={openModal}
        />
      );
    }
  });


  return (
    <>
      <div className="App">
        <TextField />
        <DndContext>
          {editorSections}
          {imageSections}
        </DndContext>
        {isModalOpen && (
          <Modal
            closeModal={closeModal}
            addEditor={addEditor}
            handleImageUpload={handleImageUpload}
            setSelectedSectionType={setSelectedSectionType}
          />
        )}

        <Footer />

        <button
          onClick={openModal}
          className="fixed bottom-5 right-16 bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Add Section
        </button>
      </div>

      <EditorSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onBackgroundChange={handleBackgroundChange}
        title="Image Section"
        ctitle="Color"
      />
    </>
  );
});
Home.displayName = 'Home';
export default Home;
