import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

// createContext
const CreateContext = createContext({
    myTodo: [],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
});

// customHook..
const useCustomHook = () => useContext(CreateContext);

// providerFunction
const ContextProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    // const API_URL = 'http://localhost:5000/api/users'; // Updated API URL
    const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api/users'
  : 'https://todo-curd-3.onrender.com/api/users';

    // Get all todos from the backend (GET)
    const getTodos = async () => {
        try {
            const response = await axios.get(API_URL);
            setTodos(response.data); // Set the todos from the response
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    // Add a new todo (POST)
    const addTodo = async (todo) => {
        try {
            const response = await axios.post(API_URL, todo);
            setTodos((prev) => [response.data, ...prev]); // Add the new todo to the state
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    // Update an existing todo (PUT)
    const updateTodo = async (id, updatedTodo) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
            setTodos((prev) =>
                prev.map((todo) => (todo._id === id ? response.data : todo))
            );
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    // Delete a todo (DELETE)
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTodos((prev) => prev.filter((todo) => todo._id !== id)); // Remove the deleted todo from state
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    // Toggle the completion status of a todo
    const toggleComplete = async (id) => {
        const todo = todos.find((t) => t._id === id);
        if (todo) {
            try {
                const updatedTodo = { ...todo, completed: !todo.completed };
                await updateTodo(id, updatedTodo); // Call the update function to update the completion status
            } catch (error) {
                console.error("Error toggling todo completion:", error);
            }
        }
    };

    // Fetch todos on initial render
    useEffect(() => {
        getTodos(); // Fetch todos from the backend when the component mounts
    }, []);

    return (
        <CreateContext.Provider
            value={{
                todos,
                addTodo,
                updateTodo,
                deleteTodo,
                toggleComplete,
            }}
        >
            {children}
        </CreateContext.Provider>
    );
};

export { ContextProvider, useCustomHook };


