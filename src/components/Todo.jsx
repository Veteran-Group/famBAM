import React, { useState } from "react";
import { Text } from '@mantine/core';
import './styles/todo.css';
import { Button, Collapse } from '@mantine/core';
import kittens from './styles/ComponentAssets/kittens.jpeg';
import puppies from './styles/ComponentAssets/puppies.jpeg';
import dinosaurs from './styles/ComponentAssets/dinosaurs.jpeg'
import planes from './styles/ComponentAssets/planes.jpeg'

const Todo = () => {
  const [newToDo, setNewToDo] = useState('');
  const [opened, setOpened] = useState(false);
  const [background, setBackground] = useState(null);

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

  const handleSelect = (event) => {
    event.preventDefault()
    setBackground(event.target.value)
  };

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
    <div style={{backgroundImage: `url(${background})`}}className="todo">
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

            {/* Flexbox? */}
            <Text size='sm'>Background:</Text>
      <select onChange={handleSelect}>
        <option value='white'>Nothing</option>
        <option value={kittens}>Kittens</option>
        <option value={puppies}>Puppies</option>
        <option value={dinosaurs}>Dinosaurs</option>
        <option value={planes}>Planes</option>
      </select>
    </div>
  )
}

export default Todo;