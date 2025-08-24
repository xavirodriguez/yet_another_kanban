import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Column } from './Column';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { ColumnType, TaskType } from '../types';
import { moveTask } from '../state/boardSlice';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
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

  // Determinar la clase CSS basada en el número de columnas
  const getGridClass = (columnCount: number): string => {
    if (columnCount <= 5) return `board-grid-${columnCount}`;
    return 'board-grid-5'; // Máximo 5 columnas en pantalla
  };

  return (
    <>
      <Add />
      <div className={`board-container ${getGridClass(columns.length)}`}>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {columns.map((column: ColumnType) => (
            <Column key={column.id} column={column} />
          ))}
          <DragOverlay>
            {activeTask ? (
              <div className="task-overlay">{activeTask.content}</div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};
