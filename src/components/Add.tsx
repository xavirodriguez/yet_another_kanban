export const Add: React.FC = () => {
  const handleAddTask = () => {
    // Aquí podrías abrir un modal o redirigir a una página de creación de tareas
    alert('Funcionalidad para añadir tarea aún no implementada.');
  };

  return (
    <button
      onClick={handleAddTask}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '8px',
        padding: '0.6rem 1.2rem',
        fontSize: '1rem',
        cursor: 'pointer',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')
      }
    >
      ➕ Añadir tarea
    </button>
  );
};
