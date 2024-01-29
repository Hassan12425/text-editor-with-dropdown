import React, { useState } from "react";
import CustomButton from "./common/CustomButton";

interface ImageSectionProps {
  image: string;
  index: number;
  backgroundColor: string;
  handleImageClick: (index: number) => void;
  addNewImageSection: () => void;
  deleteImageSection: (index: number) => void;
  openModal: () => void;
  handleClick?: () => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  image,
  index,
  backgroundColor,
  handleImageClick,
  addNewImageSection,
  deleteImageSection,
  openModal,
  handleClick,
}) => {

  return (
    <div
      key={index} className="relative m-auto">
      <div
        className={`absolute`}
      >
        <div className="relative  w-[729px] border-double border z-20 border-transparent cursor-pointer group">
                        <div className="absolute left-[348.5px] -top-4 w-8 h-8 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button
            className="w-8 h-8 "
            onClick={() => {
              openModal();
            }}
          >
            <img
              className="w-full h-full  object-contain"
              src="/images/add.png"
              alt="Button icon"
            />
          </button>

        </div>
        </div>
      </div>

      <div className="group relative">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out">
          <CustomButton
            position="top-0 right-[-40px]"
            onClick={addNewImageSection}
            iconSrc="/images/copy.png"
          />
          <CustomButton
            position="top-0 right-[-80px]"
            onDelete={() => deleteImageSection(index)}
            iconSrc="/images/delete.png"
          />
        </div>


        <div
  onClick={() => handleImageClick(index)}
  className="w-[729px] m-auto bg-white border border-double transition-all hover:border-2 hover:border-blue-500 "
  style={{ backgroundColor }}
>
  <img
    className="h-72 my-10 w-[450px] mx-auto"
    src={image}
    alt={`Uploaded ${index + 1}`}
  />
</div>

      </div>

    </div>
  );
};

export default ImageSection;
