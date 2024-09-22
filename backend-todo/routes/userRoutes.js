import express from 'express';
import { getTodos, getTodoById, createTodo, deleteTodo, updateTodo } from '../controllers/userController.js';

const router = express.Router();

router.route('/')
.get(getTodos)    // Get all todos
.post(createTodo); // Create a new todo

router.route('/:id')
.delete(deleteTodo) // Delete a todo by ID
.get(getTodoById)   // Get a todo by ID
.put(updateTodo)    // Update a todo by ID

export default router;
