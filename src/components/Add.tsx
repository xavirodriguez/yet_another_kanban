import { useDispatch } from 'react-redux';
import PlusIcon from './PlusIcon';
import { openAddForm } from '../state/uiSlice';

export const Add: React.FC = () => {
  const dispatch = useDispatch();
  const handleAddTask = () => {
    // Aquí podrías abrir un modal o redirigir a una página de creación de tareas
    //alert('Funcionalidad para añadir tarea aún no implementada.');
    // Por ejemplo, podrías despachar una acción para abrir un modal
    dispatch(openAddForm());
  };

  return (
    <div
      onClick={handleAddTask}
      style={{
        /*
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background: #007bff;
          color: white;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          cursor: pointer;
        */
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '3.5rem',
        height: '3.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '2rem',
        borderRadius: '50%',
        background: '#F7C331',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        fontSize: '2rem',
        cursor: 'pointer',
      }}
    >
      <PlusIcon style={{ width: '70%' }} />
    </div>
  );
};
