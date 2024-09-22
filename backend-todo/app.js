import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from "cors"

const port = process.env.PORT || 3000; // Use environment variable for port if available
connectDB()  //connect to mongoDb
dotenv.config() // Load environment variables from .env
const app = express();
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors())
app.use('/api/users',userRoutes) // use Routes


//Basic route to test the server
app.get('/', (req, res) => {
    res.send('Server is running smoothly....');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
