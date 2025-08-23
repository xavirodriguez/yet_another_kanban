import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TaskType } from '../types';

interface TaskProps {
  task: TaskType;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  useSortable({ id: task.id }); // El hook principal

  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useSortable({
      id: task.id,
    });

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    // the transform doesnt work!!!
    opacity: isDragging ? 1 : 0.5, // Cambia la opacidad al arrastrar
    //opacity: isOver ? 1 : 0.5,
    // change mouse icon
    cursor: 'move',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} // listeners contiene onMouseDown, onKeyDown, etc.
      className="task"
    >
      {task.content}
    </div>
  );
};
