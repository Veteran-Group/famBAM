import React, { useState } from "react";
import { Text } from '@mantine/core';
import './styles/todo.css';
import { Button, Collapse } from '@mantine/core';

const Todo = () => {
  const [newToDo, setNewToDo] = useState('');
  const [opened, setOpened] = useState(false);

  const [toDoList, setToDoList] = useState([
    {task: 'Meow', instructions: 'Like a cat'},
    {task: 'Run', instructions: 'Use your legs'},
    {task: 'Purr', instructions: 'You gotta ask a cat how to do this because I dunno how they do that for real.'}]);

  const toDo = toDoList.map((toDo, index) =>
  //can handle this better if using actual identifier for key.
  <ul className='list' key={index}>
    <div className='task'
    onClick={() => setOpened((o) => !o)}>
      {!opened ? <div>{toDo.task}</div> : <u>{toDo.task}</u>}
    </div>
    <Collapse in={opened}>
      <i>{toDo.instructions}</i>
    </Collapse>
    <Button
     className='button'
     color="yellow"
     radius="md"
     size="xs"
     compact>
      Edit
    </Button>
    <Button
     className='button'
     color="red"
     radius="md"
     size="xs"
     compact>
      Delete
    </Button>
  </ul>);

  const handleAddToDo = () => {
    if (newToDo.length > 0) {
      setToDoList((prevtoDoList) => {
        return [...prevtoDoList, newToDo]
      })
    } else {
      //need better way than alert to handle
      alert('Please enter a value')
    }
  };

  const toDoInput = (event) => {
    setNewToDo(event.target.value)
  };

  return (
    <div className="todo">
      <div>
      <Text className='header' weight={700}> To do list </Text>
      <Button
      className='addButton'
      onClick={handleAddToDo}
      color="green" radius="md"
      size="xs"
      compact>
        Add
      </Button>
      </div>
      <input
      required
      className='input'
      onChange={toDoInput}
      />
      <div>{toDo}</div>
    </div>
  )
}

export default Todo;