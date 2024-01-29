'use client'
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import TextField from "./components/TextField";
import EditorSidebar from "./components/EditorSidebar";
import CustomButton from "./components/common/CustomButton";
import ImageSection from "./components/ImageSection";
import { DndContext, closestCenter, useDraggable } from "@dnd-kit/core";
import { Editor } from "./text-editor";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Modal from "./components/common/Model";
import { DraggableComponent } from "./components/DraggableComponent";

enum SectionType {
  EDITOR = 'EDITOR',
  IMAGE = 'IMAGE',
}

interface EditorItem {
  type: 'EDITOR';
  index: number;
  id: string;
}

interface ImageItem {
  type: 'IMAGE';
  index: number;
  image: string;
  backgroundColor: string;
  id: string;
}

const Home: React.FC = React.memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorCount, setEditorCount] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [backgroundColors, setBackgroundColors] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSectionType, setSelectedSectionType] = useState<string | null>(null);
  const [combinedSections, setCombinedSections] = useState<(EditorItem | ImageItem)[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [inputText, setInputText] = useState<string>('');

  const handleImageClick = (index: number) => {
    const newSections = [...combinedSections];
    const editorIndex = newSections.findIndex((section) => section.type === SectionType.EDITOR);

    if (editorIndex !== -1 && editorIndex !== index) {
      [newSections[editorIndex], newSections[index]] = [newSections[index], newSections[editorIndex]];
      setCombinedSections(newSections);
    }
    setSelectedImageIndex(index);
    openSidebar();
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
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
    closeModal();
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prevImages => [...prevImages, reader.result as string]);
        setBackgroundColors(prevColors => [...prevColors, 'transparent']);
      };
      reader.readAsDataURL(file);
    }
    closeModal();
  };

  const addNewEditorSection = () => {
    setEditorCount(prevCount => prevCount + 1);
  };

  const deleteEditorSection = (indexToDelete: number) => {
    setEditorCount(prevCount => prevCount - 1);
  };

  const addNewImageSection = () => {
    const newImage = uploadedImages[uploadedImages.length - 1];
    setUploadedImages(prevImages => [...prevImages, newImage]);
    setBackgroundColors(prevColors => [...prevColors, 'white']);
  };

  const deleteImageSection = (indexToDelete: number) => {
    setUploadedImages(prevImages => prevImages.filter((_, index) => index !== indexToDelete));
    setBackgroundColors(prevColors => prevColors.filter((_, index) => index !== indexToDelete));
  };

  useEffect(() => {
    const updatedSections = [
      ...Array(editorCount).fill(0).map((_, index) => ({ type: 'EDITOR', index, id: `editor_${index}` } as EditorItem)),
      ...uploadedImages.map((image, index) => ({ type: 'IMAGE', index, image, backgroundColor: backgroundColors[index], id: `image_${index}` } as ImageItem)),
    ];

    setCombinedSections(updatedSections);
  }, [editorCount, uploadedImages, backgroundColors]);


  const onDragEnd = (event: any) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) {
      return;
    }

    const updatedSections = [...combinedSections];

    const oldIndex = combinedSections.findIndex((section) => section.id === active.id);
    const newIndex = combinedSections.findIndex((section) => section.id === over.id);

    const [movedSection] = updatedSections.splice(oldIndex, 1);
    updatedSections.splice(newIndex, 0, movedSection);

    setCombinedSections(updatedSections);
  };

  const handleContentChange = (newContent: string) => {
    setInputText(newContent);
  };
  return (
    <>
      <div className="App">
        <TextField />
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={combinedSections} strategy={verticalListSortingStrategy}>
            {combinedSections.map((section, index) => (
              <DraggableComponent key={section.id} index={index} sectionType={section.type}>
                {section.type === SectionType.EDITOR ? (
                  <div
                    className="relative m-auto"
                  >
                    <div
                      className={`absolute`}
                    >
                      <div className="relative  w-[729px] border-double border z-20 border-transparent cursor-pointer group">
                        <div className="absolute left-[348.5px] -top-4 w-8 h-8 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
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
                        </div>
                      </div>


                    </div>

                    <div className="group relative">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out">
                        <CustomButton position="top-0 right-[-40px]" onClick={addNewEditorSection} iconSrc="/images/copy.png" />
                        <CustomButton position="top-0 right-[-80px]" onDelete={() => deleteEditorSection(index)} iconSrc="/images/delete.png" />
                      </div>
                      <Editor onContentChange={handleContentChange} initialContent={inputText} />
                    </div>
                  </div>
                ) : (
                  <ImageSection
                    image={(section as ImageItem).image}
                    index={(section as ImageItem).index}
                    backgroundColor={(section as ImageItem).backgroundColor}
                    handleImageClick={handleImageClick}
                    addNewImageSection={addNewImageSection}
                    deleteImageSection={deleteImageSection}
                    openModal={openModal}

                  />
                )}
              </DraggableComponent>
            ))}
          </SortableContext>
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
