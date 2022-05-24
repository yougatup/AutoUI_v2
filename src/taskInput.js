import './taskInput.css';
import {useState, useEffect} from 'react';

function TaskInput(props) {
  const [inputValue, setInputValue] = useState('');

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleKeyPress(e) {
    if(e.key == "Enter") {
      props.onMessageSubmitted(inputValue);

      setInputValue('');
      e.preventDefault();
    }
  }

  return (
    <div className="taskInput">
      <div className='myTaskInputBox'>
        <textarea className='myTaskInputTextArea' 
                  onKeyPress={handleKeyPress} 
                  onChange={handleChange}
                  value={inputValue}
                  >
        </textarea>
      </div>
    </div>
  );
}

export default TaskInput;
