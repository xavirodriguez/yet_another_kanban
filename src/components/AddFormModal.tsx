import { useDispatch, useSelector } from 'react-redux';
import { closeAddForm } from '../state/uiSlice';
import { AddForm } from './AddForm';

export const AddFormModal: React.FC = () => {
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.ui.showAddForm);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={() => dispatch(closeAddForm())}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <AddForm />
      </div>
    </div>
  );
};
