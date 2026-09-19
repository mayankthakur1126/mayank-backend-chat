import 'dotenv/config';
import app from './app.js';
// import connectDB from './config/db.js';
import sequelize from "./config/db.js"

const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDB();

//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error.message);
//   }
// };

// startServer();

// async function startServer() {
//   try {
//     await sequelize.sync(); 
//     console.log('Database synchronized successfully.');

//     // Start listening for traffic only after a successful sync
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Failed to synchronize database:', error);
//     process.exit(1); // Stop the process if database sync fails
//   }
// }

async function startServer() {
  try {
    // Test the raw connection first
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Then sync tables
    await sequelize.sync(); 
    console.log('Database synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the application:', error);
    process.exit(1); 
  }
}

startServer();