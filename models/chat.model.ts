
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Chat extends Model {
  declare id: number;
  declare userAId: number;
  declare userBId: number;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userAId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userBId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "chats",
    timestamps: true
  }
);

export default Chat;
