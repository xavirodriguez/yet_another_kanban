import { useDispatch } from 'react-redux';
import PlusIcon from './PlusIcon';
import { openAddForm } from '../state/uiSlice';

export const Add: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(openAddForm());
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAddTask();
    }
  };

  return (
    <button
      className="add-button"
      onClick={handleAddTask}
      onKeyDown={handleKeyDown}
      aria-label="Add new task"
      title="Add new task"
    >
      <PlusIcon className="add-button-icon" />
    </button>
  );
};
