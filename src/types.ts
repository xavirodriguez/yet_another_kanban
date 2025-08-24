export interface TaskType {
  id: string;
  content: string;
}

export interface ColumnType {
  id: string;
  title: string;
  tasks: TaskType[]; 
}

// Definir tipos más específicos para el estado de Redux
export interface BoardState {
  tasks: Record<string, TaskType>;
  columns: Record<string, {
    id: string;
    title: string;
    taskIds: string[];
  }>;
  columnOrder: string[];
}