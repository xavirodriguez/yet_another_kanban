import React from 'react';
import type { ColumnType } from '../types';
import { Task } from './Task';
import { useDroppable } from '@dnd-kit/core';

// Paleta de colores predefinida
const COLUMN_COLORS = [
  '#6B7A8F', // Blueberry
  '#F7882F', // Apricot
  '#F7C331', // Citrus
  '#DCC7AA', // Apple Core
  '#5C3D5B', // Deep Plum
  '#CEDBEF', // Misty Sky
  '#E7AFAF', // Coral Blush
  '#A8DADC', // Powder Blue
  '#F1FAEE', // Honeydew
  '#E63946', // Imperial Red
];

// Función para generar color basado en el ID de la columna
const getColumnColor = (columnId: string): string => {
  // Extrae el número del ID de la columna (ej: 'column-1' -> 1)
  const match = columnId.match(/column-(\d+)/);
  if (match) {
    const columnIndex = parseInt(match[1], 10) - 1; // -1 porque los arrays empiezan en 0
    return COLUMN_COLORS[columnIndex % COLUMN_COLORS.length];
  }

  // Si el formato no coincide, usa hash simple del string
  let hash = 0;
  for (let i = 0; i < columnId.length; i++) {
    const char = columnId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const colorIndex = Math.abs(hash) % COLUMN_COLORS.length;
  return COLUMN_COLORS[colorIndex];
};

export const Column: React.FC<{ column: ColumnType }> = ({ column }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const style: React.CSSProperties = {
    backgroundColor: getColumnColor(column.id),
    display: 'block',
    borderRadius: '10px',
    padding: '16px',
    minHeight: '200px',
  };

  return (
    <div className="column" ref={setNodeRef} style={style}>
      <h3
        style={{
          margin: '0 0 16px 0',
          color: 'white',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        }}
      >
        {column.title}
      </h3>
      {column.tasks.length === 0 && (
        <p style={{ color: 'white', opacity: 0.7, fontStyle: 'italic' }}>
          No tasks in this column
        </p>
      )}
      {column.tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};
