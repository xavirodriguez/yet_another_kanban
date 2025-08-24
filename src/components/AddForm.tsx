import { useSelector } from 'react-redux';

export const AddForm: React.FC = () => {
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
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <select
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          >
            {columns.map((column: any) => (
              <option key={column.id} value={column.id}>
                {column.title}
              </option>
            ))}
          </select>

          <textarea
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
