import express from 'express';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import sequelize from "./config/db.js"
const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/chat', chatRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'User CRUD API is running'
  });
});

// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


const PORT = process.env.PORT || 5000
async function startServer() {
  try {
    await sequelize.sync(); 
    console.log('Database synchronized successfully.');

    // Start listening for traffic only after a successful sync
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to synchronize database:', error);
    process.exit(1); // Stop the process if database sync fails
  }
}

startServer();

export default app;