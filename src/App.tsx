import { Provider } from 'react-redux';
import './App.css';
import { Board } from './components/Board';
import { store } from './state/store';
import { AddFormModal } from './components/AddFormModal';
function App() {
  return (
    <>
      <Provider store={store}>
        <Board></Board>
        <AddFormModal />
      </Provider>
    </>
  );
}

export default App;
