import React, { useState } from 'react';
import { useCustomHook } from '../context';

function TodoList({ data }) {
    const { deleteTodo, updateTodo, toggleComplete } = useCustomHook();
    const { _id, title, description, completed } = data;
    const [msgDescription, setMsgDescription] = useState(description); // State for editing the description
    const [isEditableTodo, setIsEditableTodo] = useState(false);
    const [msgTodo, setMsgTodo] = useState(title); // State for editing the title

    const edit = () => {
        updateTodo(_id, { ...data, title: msgTodo, description: msgDescription });
        setIsEditableTodo(false);
    };

    const toggleCompleted = () => {
        toggleComplete(_id);
    };

    return (
        <div className='listHeading'>
            <div className='todoList'>
                <label className='checkBox'>
                    <input type='checkbox' checked={completed} onChange={toggleCompleted} />
                </label>

                <div className="flex flex-col">
                    {/* Title Input */}
                    <input id='title'
                        className={`title ${completed ? "listInput2" : "listInput"
                            }`}  // Fixed height of 2.5rem (40px)
                        type="text"
                        value={msgTodo}
                        onChange={(e) => setMsgTodo(e.target.value)}
                        readOnly={!isEditableTodo}
                        placeholder="Title"
                    />

                    {/* Description Input */}
                    <input
                        className={` description ${completed ? "listInput2 mt-2" : "listInput mt-2"}`}
                        type="text"
                        value={msgDescription}
                        onChange={(e) => setMsgDescription(e.target.value)}
                        readOnly={!isEditableTodo}
                        placeholder="Description"
                    />
                </div>



                <button style={{
                    width: "30px",
                    marginRight: "5px",
                    border: "none",
                    borderRadius: "2px"
                }}
                    onClick={() => {
                        if (completed) return;
                        isEditableTodo ? edit() : setIsEditableTodo((pre) => !pre);
                    }}
                    disabled={completed}
                >
                    {isEditableTodo ? "📁" : "🖊"}
                </button>

                <button style={{ border: "none", borderRadius: "2px", marginRight: "5px" }} onClick={() => deleteTodo(_id)} disabled={completed}>❌</button>
            </div>
        </div>
    );
}

export default TodoList;



