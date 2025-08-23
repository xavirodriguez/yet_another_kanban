import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Column } from './Column';
// import { RootState } from './store'; // Importarás esto desde tu store
// import { moveTask } from './boardSlice'; // La acción que crearás
import { DndContext } from '@dnd-kit/core';
import type { ColumnType } from '../types';
import { moveTask } from '../state/boardSlice';
import type { DragEndEvent } from '@dnd-kit/core';

//
export const Board: React.FC = () => {
  const dispatch = useDispatch();

  const columns = useSelector((state: any) => {
    const { tasks, columns: columnsById, columnOrder } = state.board;
    return columnOrder.map((columnId: string) => ({
      ...columnsById[columnId],
      tasks: columnsById[columnId].taskIds.map(
        (taskId: string) => tasks[taskId],
      ),
    }));
  });
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over) {
      dispatch(moveTask({ activeId: active.id, overId: over.id }));
    }
  }
  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns.length}, minmax(300px, 1fr))`,
    gap: '16px',
    padding: '16px',
  };
  return (
    <>
      <div style={style}>
        <DndContext onDragEnd={handleDragEnd}>
          {columns.map((column: ColumnType, position: number) => (
            <Column key={column.id} column={column} />
          ))}
        </DndContext>
      </div>
    </>
  );
};
