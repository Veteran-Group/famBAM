import React, { useState } from "react";
import { Text } from '@mantine/core';
import './styles/todo.css';
import { Button } from '@mantine/core';

const Todo = () => {
  const [newToDo, setNewToDo] = useState('');
  //May change to an array of objects
  const [toDoList, setToDoList] = useState(['run', 'meow', 'purr']);

  const toDo = toDoList.map((toDo, index) =>
  //can handle this better if using actual identifier for key.
  <ul className='list' key={index}>
    {toDo}
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

  const handleAddToDo = (t) => {
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
      {toDo}
    </div>
  )
}

export default Todo;