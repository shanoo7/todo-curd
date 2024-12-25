import React, { useState } from "react";
import { useCustomHook } from "../context";

function TodoList({ data }) {
    const { deleteTodo, updateTodo, toggleComplete } = useCustomHook();
    const { _id, title, description, completed } = data;
    const [msgDescription, setMsgDescription] = useState(description);
    const [isEditableTodo, setIsEditableTodo] = useState(false);
    const [msgTodo, setMsgTodo] = useState(title);

    const edit = () => {
        updateTodo(_id, { ...data, title: msgTodo, description: msgDescription });
        setIsEditableTodo(false);
    };

    const toggleCompleted = () => {
        toggleComplete(_id);
    };

    return (
        <div className="p-4 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center space-x-4">
                {/* Checkbox */}
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={toggleCompleted}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                </label>

                {/* Title and Description */}
                <div className="flex flex-col items-start flex-grow">
                    <input
                        id="title"
                        className={`w-full text-sm border p-1 font-medium rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none outline-none${completed
                                ? "bg-gray-200 text-gray-500 line-through"
                                : "bg-white text-black"
                            }`}
                        type="text"
                        value={msgTodo}
                        onChange={(e) => setMsgTodo(e.target.value)}
                        readOnly={!isEditableTodo}
                        placeholder="Title"
                    />
                    <input
                        className={`w-full mt-1 text-sm border p-1 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none outline-none${completed
                                ? "bg-gray-200 text-gray-500 line-through"
                                : "bg-white text-black"
                            }`}
                        type="text"
                        value={msgDescription}
                        onChange={(e) => setMsgDescription(e.target.value)}
                        readOnly={!isEditableTodo}
                        placeholder="Description"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            if (completed) return;
                            isEditableTodo ? edit() : setIsEditableTodo((pre) => !pre);
                        }}
                        disabled={completed}
                        className={`px-2 py-1 text-sm rounded-md transition-all duration-200 ${completed
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                    >
                        {isEditableTodo ? "📁" : "🖊"}
                    </button>
                    <button
                        onClick={() => deleteTodo(_id)}
                        disabled={completed}
                        className={`px-2 py-1 text-sm rounded-md transition-all duration-200 ${completed
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                    >
                        ❌
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
