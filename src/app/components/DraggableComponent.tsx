// DraggableComponent.tsx
import React, { useState } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import CustomButton from './common/CustomButton';

interface DraggableComponentProps {
  children: React.ReactNode;
  index: number;
  sectionType: string;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({ children, index, sectionType }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${index}`,
    disabled: !isDragging,
  });

  const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: `droppable-${index}`,
  });

  const buttonPosition = sectionType === 'EDITOR' ? 'top-[-152px] left-[-40px]' : 'top-[-370px] left-[-40px]';

  return (
    <div
      data-id={`draggable-${index}`}
      ref={(node) => {
        setNodeRef(node);
        setDroppableNodeRef(node);
      }}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: transform ? `translate(0, ${transform.y}px)` : undefined,
        transition: 'transform 0.25s ease',
        position: 'relative',
        zIndex: (isDragging || isOver || isHovered) ? 100 : 'auto', 
      }}
    >
      {children}
      <div className="group relative">
        <div
          className={`opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-1000 ease-in-out`}
        >
          <CustomButton
            position={buttonPosition}
            iconSrc="/images/drag.png"
            className="cursor-grab"
          />
        </div>
      </div>
    </div>
  );
};
