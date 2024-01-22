import { useDraggable, useDroppable } from "@dnd-kit/core";

interface DraggableComponentProps {
  children: React.ReactNode;
  index: number;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({ children, index }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${index}`,
  });

  const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: `droppable-${index}`,
  });

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        setDroppableNodeRef(node);
      }}
      {...attributes}
      {...listeners}
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        transition: "transform 0.25s ease",
        border: isOver ? "" : "none", 
      }}
    >
      {children}
    </div>
  );
};
