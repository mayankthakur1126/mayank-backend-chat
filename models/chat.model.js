import { DataTypes } from "sequelize";
import sequelize from '../config/db.js'

const Chat = sequelize.define('Chat', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userAId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userBId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

export default Chat;