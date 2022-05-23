import logo from './logo.svg';
import TaskInput from "./taskInput.js"
import './App.css';
import {useState, useEffect} from 'react';

function App() {
  return (
    <div className="App">
      <div className='header'> AutoUI </div>
      <div className='leftPlane'> 
        <div className='taskList'>

        </div>

        <TaskInput > </TaskInput>
      </div>
      <div className='rightPlane'>
        <div className='UIPlane'>

        </div>
        <div className='tablePlane'>

        </div>
         </div>
    </div>
  );
}

export default App;
