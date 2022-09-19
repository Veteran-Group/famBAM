import React, { useState, useContext, useEffect } from "react";
import { Text } from '@mantine/core';
import './styles/todo.css';
import { Button, Collapse, Group, Modal } from '@mantine/core';
import axios from 'axios';
import { api } from '../config.js';
import {AppContext} from '../App.js';
//background images
import kittens from './styles/ComponentAssets/kittens.jpeg';
import puppies from './styles/ComponentAssets/puppies.jpeg';
import dinosaurs from './styles/ComponentAssets/dinosaurs.jpeg'
import planes from './styles/ComponentAssets/planes.jpeg';


const Todo = () => {
  let {profile} = useContext(AppContext);

  const [newToDo, setNewToDo] = useState('');
  const [instructions, setInstructions] = useState('')
  const [background, setBackground] = useState(null);
  const [opened, setOpened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);


  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    axios.get(`${api}/getToDo?user=${profile.username}&id=${profile.id}`)
      .then((response) => {
        setToDoList(response.data);
      })
  }, [])

   //ON CLICKING ADD BUTTON
   const handleAddToDo = (event) => {
    event.preventDefault();

    axios.post(`${api}/newToDo?user=${profile.username}&id=${profile.id}&task=${newToDo}&instruction=${instructions}&taskId=${Math.random().toString()}`)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    });

      setToDoList((prevtoDoList) => {
        return [...prevtoDoList, {task: newToDo, instructions: instructions}]
      })
  };

      //ON CLICKING CHECK BOX INPUT
      const handleComplete = () => {

        axios.put(`${api}/completeToDo?user${profile.username}&id=${profile.id}&taskId=${toDoList.id}`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        });

        setModalOpen(false);
      };

      const confirmComplete = () => {
        setModalOpen(true);
      };

  const toDoInput = (event) => {
    setNewToDo(event.target.value)
  };

  const toDoInstructions = (event) => {
    setInstructions(event.target.value)
  };

  const handleSelect = (event) => {
    event.preventDefault()
    setBackground(event.target.value)
  };

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
    <input type='checkbox' onClick={confirmComplete}/>
    {/* <Button
     className='button'
     color="red"
     radius="md"
     size="xs"
     compact>
      Delete
    </Button> */}
  </ul>);

  return (
    <div style={{backgroundImage: `url(${background})`}}className="todo">
      <div>
      <Text className='header' weight={700}> To do list </Text>
      </div>
      <form onSubmit={handleAddToDo}>
        <input
        placeholder='Enter a task'
        required
        className='input'
        onChange={toDoInput}
        />
        <input
        placeholder='Enter task instructions'
        required
        className='input'
        onChange={toDoInstructions}
        />
      <Button
        className='addButton'
        type="submit"
        color="green" radius="md"
        size="xs"
        compact>
          Add
        </Button>
        {toDoList.length === 0 && <Text>-No Current Tasks!-</Text>}
      </form>
      <div>{toDo}</div>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Have you Completed your task?"
      >
        <Button
        className="modalYes"
        color="green"
        onClick={handleComplete}
        >
          Yes!
        </Button>
        <Button color="red" onClick={() => setModalOpen(false)}>No</Button>
      </Modal>


            {/* Flexbox? */}
      <div className='select'>
        <Text size='sm'>Background:</Text>
        <select className='select' onChange={() => setModalOpen(true)}>
          <option value='white'>Nothing</option>
          <option value={kittens}>Kittens</option>
          <option value={puppies}>Puppies</option>
          <option value={dinosaurs}>Dinosaurs</option>
          <option value={planes}>Planes</option>
        </select>
      </div>
    </div>
  )
}

export default Todo;