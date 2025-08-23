import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Configurar el store de Redux' },
      'task-2': { id: 'task-2', content: 'Diseñar la estructura de los componentes' },
      'task-3': { id: 'task-3', content: 'Instalar y configurar dnd-kit' },
      'task-4': { id: 'task-4', content: 'Implementar el componente Board' },
      'task-5': { id: 'task-5', content: 'Conectar los componentes al estado de Redux' },
      'task-6': { id: 'task-6', content: 'Refactorizar el estilo del componente Task' },
      'task-7': { id: 'task-7', content: 'Configuración inicial del proyecto' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Por Hacer',
        taskIds: ['task-1', 'task-2', 'task-3'],
      },
      'column-2': {
        id: 'column-2',
        title: 'En Progreso',
        taskIds: ['task-4', 'task-5'],
      },
      'column-3': {
        id: 'column-3',
        title: 'En Revisión',
        taskIds: ['task-6'],
      },
      'column-4': {
        id: 'column-4',
        title: 'Hecho',
        taskIds: ['task-7'],
      },
    },
    // También guardamos el orden de las columnas
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
  };

 const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {
     moveTask(state, action) {
        const { activeId, overId } = action.payload;
        if (!overId) return;
      
        // Encuentra de qué columna viene la tarea
        const sourceColumnId = Object.keys(state.columns).find(colId =>
          state.columns[colId].taskIds.includes(activeId)
        );
        if (!sourceColumnId) return;
      
        // Encuentra la columna destino
        const destinationColumnId = overId;
      
        // Si soltaste en la misma columna, no cambiamos nada
        if (sourceColumnId === destinationColumnId) return;
      
        // Saca la tarea de la columna origen
        const sourceTasks = state.columns[sourceColumnId].taskIds;
        state.columns[sourceColumnId].taskIds = sourceTasks.filter(id => id !== activeId);
      
        // Añade la tarea a la columna destino (al final, o podrías calcular posición)
        state.columns[destinationColumnId].taskIds.push(activeId);
      }
      
   }
 });

export const { moveTask } = boardSlice.actions;
export default boardSlice.reducer;