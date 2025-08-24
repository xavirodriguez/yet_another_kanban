import React from 'react';
import type { ColumnType } from '../types';
import { Task } from './Task';
import { useDroppable } from '@dnd-kit/core';

// Función para obtener el número de columna del ID
const getColumnNumber = (columnId: string): number => {
  const match = columnId.match(/column-(\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  // Si no coincide con el patrón, usar hash para generar un número
  let hash = 0;
  for (let i = 0; i < columnId.length; i++) {
    const char = columnId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return (Math.abs(hash) % 10) + 1; // 1-10
};

export const Column: React.FC<{ column: ColumnType }> = ({ column }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const columnNumber = getColumnNumber(column.id);
  const columnClass = `column column-${columnNumber}`;

  return (
    <div className={columnClass} ref={setNodeRef}>
      <h3 className="column-title">{column.title}</h3>
      {column.tasks.length === 0 && (
        <p className="column-empty-message">No tasks in this column</p>
      )}
      {column.tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};
