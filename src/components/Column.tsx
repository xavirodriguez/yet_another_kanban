import React from 'react';
import type { ColumnType } from '../types';
import { Task } from './Task';
import { useDroppable } from '@dnd-kit/core';

export const Column: React.FC<{ column: ColumnType }> = ({ column }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const bgColors: { [key: string]: string } = {
    'column-1': '#6B7A8F', // Blueberry
    'column-2': '#F7882F', // Apricot
    'column-3': '#F7C331', // Citrus
    'column-4': '#DCC7AA', // Apple Core
    'column-5': '#5C3D5B', // Deep Plum
    'column-6': '#CEDBEF', // Misty Sky
    'column-7': '#E7AFAF', // Coral Blush
  };
  const bgColor = bgColors[column.id] || '#d2cfcf'; // Default to white if no color is found
  const style = {
    backgroundColor: bgColor,
    display: 'block',
    borderRadius: '10px',
  };

  return (
    <div className="column" ref={setNodeRef} style={style}>
      <h3>{column.title}</h3>
      {column.tasks.length === 0 && <p>No tasks in this column</p>}
      {column.tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};
