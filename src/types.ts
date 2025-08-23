export interface TaskType {
    id: string;
    content: string;
  }
  
  export interface ColumnType {
    id: string;
    title: string;
    tasks: TaskType[]; 
  }
  
  export interface BoardState {
    tasks: { [taskId: string]: TaskType };
    columns: { [columnId: string]: ColumnType };
    columnOrder: string[]; // Array de IDs de columnas para mantener el orden
  }

  