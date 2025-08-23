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

  /*
      boxShadow: isDragging
      ? '0 5px 15px rgba(0,0,0,0.25)'
      : '0 1px 3px rgba(0,0,0,0.12)',
      */

  const style: React.CSSProperties = {
    //use commented styles

    // Aplica la transformación para que el elemento siga al mouse
    transform: CSS.Transform.toString(transform),
    // Aplica la transición suave cuando no está siendo arrastrado
    transition,
    // Cambia la opacidad cuando está siendo arrastrado
    opacity: isDragging ? 0.8 : 1,
    // Cambia el cursor para indicar que es draggable
    cursor: isDragging ? 'grabbing' : 'grab',
    // Asegura que el elemento se mantenga por encima de otros durante el drag
    zIndex: isDragging ? 999 : 'auto',
    // Estilo base para las tareas
    margin: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '1rem',
    backdropFilter: 'blur(2px)',
    borderRadius: '6px',
    border: '1px solid #e1e5e9',

    // Suaviza las transiciones
    willChange: 'transform',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
    >
      {task.content}
    </div>
  );
};
