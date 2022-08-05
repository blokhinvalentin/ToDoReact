import { Routes, Route } from 'react-router-dom';
import { ChangeTextPage, MainPage } from '../src/components';
import './App.scss';

const App = () => { 

  return (
    <Routes>
      <Route path="/tasks" element={<MainPage/>} />
      <Route path={"/tasks/:id"} element={<ChangeTextPage/>} />
    </Routes>
  );
}

export default App;
