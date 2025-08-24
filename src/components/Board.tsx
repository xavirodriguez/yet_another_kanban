import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Column } from './Column';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { ColumnType, TaskType } from '../types';
import { moveTask } from '../state/boardSlice';
import type { DragEndEvent } from '@dnd-kit/core';
import { Add } from './Add';
import type { RootState } from '../state/store';

export const Board: React.FC = () => {
  const dispatch = useDispatch();
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const { columns, tasks } = useSelector((state: RootState) => {
    const { tasks, columns: columnsById, columnOrder } = state.board;
    return {
      columns: columnOrder.map((columnId: string) => ({
        ...columnsById[columnId],
        tasks: columnsById[columnId].taskIds.map(
          (taskId: string) => tasks[taskId],
        ),
      })),
      tasks,
    };
  });

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const task = tasks[active.id as string];
    setActiveTask(task);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);

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
      <Add />
      <div style={style}>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {columns.map((column: ColumnType) => (
            <Column key={column.id} column={column} />
          ))}
          <DragOverlay>
            {activeTask ? (
              <div
                style={{
                  padding: '12px',
                  margin: '8px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  border: '1px solid #e1e5e9',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.25)',
                  cursor: 'grabbing',
                  transform: 'rotate(5deg)', // Pequeña rotación para dar sensación de "levantado"
                }}
              >
                {activeTask.content}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};
