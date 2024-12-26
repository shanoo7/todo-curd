
import React, { useState } from 'react';
import { useCustomHook } from '../context';
import logo from '../logo/myPic.jpg'

function TodoForm() {
  const { addTodo } = useCustomHook();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Both title and description are required!");
      return;
    }
    setError("");
    
    addTodo({ title: title, description: description, completed: false });
    setFtodo("");
    setDescription("");
  };

  return (
    <>
      <div className='sticky top-4 p-4 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <span><img className="w-8 h-8 rounded-full cursor-pointer"src={logo} alt="logo"/></span><h1 className='text-4xl font-semibold text-center text-gray-800 mb-4'>My Todo</h1>
     
        {/* Error message */}
        {error && <p className="text-center text-lg font-bold text-red-600 mb-4">{error}</p>}
        {/* form */}
        <form className='space-y-2' onSubmit={handleSubmit}>
          <input type='text' value={title} placeholder='Title...' onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'}`} />
          <input type='text' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          <button type='submit' className=' w-full p-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-all'>Add</button>
        </form>
      </div>

    </>
  )
}

export default TodoForm;