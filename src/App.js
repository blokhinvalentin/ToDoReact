import { Routes, Route } from 'react-router-dom';
import { TextInput, MainPage } from '../src/components';
import './App.scss';

const App = () => { 

  return (
    <Routes>
      <Route path="/tasks" element={<MainPage/>} />
      <Route path={`/tasks/:id/text`} element={<TextInput/>} />
    </Routes>
  );
}

export default App;
