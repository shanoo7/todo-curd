import Todo from '../models/userModel.js';

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};


// Get a Todo by ID
export const getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo' });
  }
};


// Create a new todos
export const createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTodo = new Todo({ title, description});
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user',error });
    console.log(error)
  }
};


// Update a Todo by ID
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id, 
      { title, description, completed }, 
      { new: true } // Return the updated document
    );
    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
};



// Delete a Todo by ID
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Todo' });
  }
};

