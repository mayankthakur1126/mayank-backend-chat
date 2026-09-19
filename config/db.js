import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Ensures environment variables load here too

const sequelize = new Sequelize(
  process.env.DB_NAME || 'your_database_name',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 30006, // Default is 3306
    dialect: 'mysql',
    logging: false, // Set to console.log to see raw SQL queries
  }
);

export default sequelize;