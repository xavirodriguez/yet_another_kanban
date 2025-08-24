import { useSelector } from 'react-redux';
import type { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { closeAddForm } from '../state/uiSlice';
import { addTask } from '../state/boardSlice';

export const AddForm: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const columnId = formData.get('columnId') as string;
    const task = formData.get('task') as string;

    dispatch(addTask({ columnId, task }));
    e.currentTarget.reset();
    dispatch(closeAddForm());
  };

  const { columns } = useSelector((state: any) => {
    const { columns: columnsById, columnOrder } = state.board;
    return {
      columns: columnOrder.map((columnId: string) => ({
        ...columnsById[columnId],
      })),
    };
  });

  return (
    <>
      <div>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Add New Task</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <select
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
            name="columnId"
            required
          >
            {columns.map((column: any) => (
              <option key={column.id} value={column.id}>
                {column.title}
              </option>
            ))}
          </select>

          <textarea
            name="task"
            placeholder="Task Description"
            rows={4}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          ></textarea>
          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '5px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};
