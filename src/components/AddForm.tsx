import { useSelector } from 'react-redux';
import type { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { closeAddForm } from '../state/uiSlice';
import { addTask } from '../state/boardSlice';
import type { RootState } from '../state/store';
import React from 'react';

export const AddForm: React.FC = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const columnId = formData.get('columnId') as string;
      const task = formData.get('task') as string;

      if (!task.trim()) {
        setError('Task description is required');
        return;
      }

      if (task.length > 500) {
        setError('Task description too long (max 500 characters)');
        return;
      }
      dispatch(addTask({ columnId, task: task.trim() }));
      e.currentTarget.reset();
      dispatch(closeAddForm());
    } catch (err) {
      setError('Failed to add task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { columns } = useSelector((state: RootState) => {
    const { columns: columnsById, columnOrder } = state.board;
    return {
      columns: columnOrder.map((columnId: string) => ({
        ...columnsById[columnId],
      })),
    };
  });

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    // Permitir envío con Ctrl+Enter
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true }),
        );
      }
    }
  };

  return (
    <div>
      <h2 className="form-title">Add New Task</h2>

      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`add-form ${isSubmitting ? 'loading' : ''}`}
      >
        <label htmlFor="columnId" className="visually-hidden">
          Select column
        </label>
        <select
          id="columnId"
          name="columnId"
          required
          disabled={isSubmitting}
          className="form-select"
        >
          <option value="">Select a column...</option>
          {columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </select>

        <label htmlFor="task" className="visually-hidden">
          Task description
        </label>
        <textarea
          id="task"
          name="task"
          placeholder="Task Description (Ctrl+Enter to submit)"
          rows={4}
          maxLength={500}
          required
          disabled={isSubmitting}
          className="form-textarea"
          onKeyDown={handleTextareaKeyDown}
        />

        <button type="submit" disabled={isSubmitting} className="form-button">
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};
