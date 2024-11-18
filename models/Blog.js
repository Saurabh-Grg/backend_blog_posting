
// models/Blog.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Blog = sequelize.define(
  "Blog",
  {
    blog_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blog_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blog_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Automatically includes createdAt and updatedAt fields
    tableName: "blog",
  }
);

Blog.belongsTo(User, { foreignKey: "user_id" });

module.exports = Blog;