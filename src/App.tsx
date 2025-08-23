import { Provider } from 'react-redux';
import './App.css';
import { Board } from '@components/Board';
import { store } from './state/store';
function App() {
  return (
    <>
      <Provider store={store}>
        <Board></Board>
      </Provider>
    </>
  );
}

export default App;
