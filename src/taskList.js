import './taskList.css';
import {useState, useEffect} from 'react';

function TaskList(props) {
  return (
    <div className="taskList">
      {
        props.taskList.map( (elem) => {
          return <div className='taskMsg'> {elem.text} </div>
        })
      }
    </div>
  );
}

export default TaskList;
