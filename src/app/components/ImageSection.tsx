import React, { useState } from "react";
import CustomButton from "./common/CustomButton";

interface ImageSectionProps {
  image: string;
  index: number;
  backgroundColor: string;
  isImageHovered: boolean;
  handleImageClick: (index: number) => void;
  addNewImageSection: () => void;
  deleteImageSection: (index: number) => void;
  setIsImageHovered: React.Dispatch<React.SetStateAction<boolean[]>>;
  isHoveredAddButton: boolean;
  setIsHoveredAddButton: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: () => void;
  handleClick?: () => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  image,
  index,
  backgroundColor,
  isImageHovered,
  handleImageClick,
  addNewImageSection,
  deleteImageSection,
  setIsImageHovered,
  isHoveredAddButton,
  setIsHoveredAddButton,
  openModal,
  handleClick,
}) => {

  return (
    <div
      key={index}
      className="relative w-[840px] m-auto"
      onMouseEnter={() =>
        setIsImageHovered((prevState) =>
          prevState.map((val, i) => (i === index ? true : val))
        )
      }
      onMouseLeave={() =>
        setIsImageHovered((prevState) =>
          prevState.map((val, i) => (i === index ? false : val))
        )
      }
    >
      <div
        className={`absolute`}
        onMouseEnter={() => setIsHoveredAddButton(true)}
        onMouseLeave={() => setIsHoveredAddButton(false)}
      >
        <div className={`flex absolute left-[390px] -top-4 w-8 h-8  z-10 items-center justify-center `}>
          {isHoveredAddButton && (
            <button
              className="w-8 h-8"
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
          )}
        </div>
      </div>

      {isImageHovered && (
        <div>
          <CustomButton
            position="top-0 left-[0px]"
            iconSrc="/images/drag.png"
            onClick={handleClick}
          />
          <CustomButton
            position="top-0 right-5"
            onClick={addNewImageSection}
            iconSrc="/images/copy.png"
          />
          <CustomButton
            position="top-0 right-[-20px]"
            onDelete={() => deleteImageSection(index)}
            iconSrc="/images/delete.png"
          />
        </div>
      )}

      <div
        onClick={() => handleImageClick(index)}
        className="w-[729px] m-auto  bg-white border border-double border-blue-500"
        style={{ backgroundColor }}
      >
        <img
          className="h-72 my-10 w-[450px] mx-auto"
          src={image}
          alt={`Uploaded ${index + 1}`}
        />
      </div>
    </div>
  );
};

export default ImageSection;
