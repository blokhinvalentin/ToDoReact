import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ShowAddOption from './components/ShowAddOption/ShowAddOption';
import ShowTasks from './components/ShowTasks/ShowTasks';
import ShowPage from './components/ShowPage/ShowPage';

import './App.scss';

function App() { 

  return (<>
  <ShowPage/>
  </>
  );
}

export default App;
