import { Routes, Route } from 'react-router-dom';
import TextInput from "../src/components/TextInput/TextInput";
import MainPage from "../src/components/MainPage/MainPage";
import './App.scss';

function App() { 

  return (
  <Routes>
    <Route path="/tasks" element={<MainPage/>}/>
    <Route path={`/tasks/:id/text`} element={<TextInput/>}/>
  </Routes>
  );
}

export default App;
