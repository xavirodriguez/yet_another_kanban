import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TaskType } from '../types';

interface TaskProps {
  task: TaskType;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: task.id,
  });

  // Generar clases CSS dinámicamente
  const taskClasses = [
    'task',
    isDragging ? 'task--dragging' : 'task--grabbable',
  ].join(' ');

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={taskClasses}
      {...attributes}
      {...listeners}
      tabIndex={0}
      role="button"
      aria-label={`Task: ${task.content}`}
    >
      {task.content}
    </div>
  );
};
