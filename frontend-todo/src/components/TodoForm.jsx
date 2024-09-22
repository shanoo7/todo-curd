
import React, { useState } from 'react';
import { useCustomHook } from '../context';

function TodoForm() {
  const { addTodo } = useCustomHook();
  const [ftodo, setFtodo] = useState('');
  const [description, setDescription] = useState('');

  const add = (e) => {
    e.preventDefault();
    if (!ftodo) return;
    addTodo({ title: ftodo, description:description, completed: false });
    setFtodo("");
    setDescription("");
  };

  return (
    <>
      <h1 className='heading'>My Todo</h1>
      <div className='formHeading'>
        <form className='todoForm' onSubmit={add}>
          <input type='text' value={ftodo} placeholder='Title...' onChange={(e) => setFtodo(e.target.value)} />
          <input type='text' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
          <button type='submit'>Add</button>
        </form>
      </div>
    </>
  );
}

export default TodoForm;




