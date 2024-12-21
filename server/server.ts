import express, { Application } from 'express';
import markdownRoutes from './src/routes/markdownRoutes';
import cors from 'cors'
const app: Application = express();
const PORT = 3001;

// Using CORS middleware to handle cross-origin requests
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

// Middleware
app.use(express.json());

// Routes
app.use('/api', markdownRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
