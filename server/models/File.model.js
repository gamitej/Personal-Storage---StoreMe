const { DataTypes } = require("sequelize");
const { sequelize } = require("./Connection");

const File = sequelize.define(
  "File",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users", // Table name as string
        key: "user_id",
      },
    },
    parent_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "files", // Table name as string
        key: "id",
      },
    },
    // ... name, type, etc. (keep your existing fields)
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM("file", "folder"), allowNull: false },
    mime_type: { type: DataTypes.STRING, allowNull: true },
    size: { type: DataTypes.BIGINT, defaultValue: 0 },
    storage_path: { type: DataTypes.STRING, allowNull: true },
    checksum: { type: DataTypes.STRING, allowNull: true },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    modelName: "File",
    tableName: "files",
    timestamps: true,
    indexes: [
      { fields: ["parent_id"] },
      { fields: ["user_id"] },
      { fields: ["name"] },
    ],
  }
);

// We define associations inside a function to be called after ALL models are loaded
File.associate = (models) => {
  File.belongsTo(models.User, { foreignKey: "user_id" });
  File.hasMany(models.File, { as: "children", foreignKey: "parent_id" });
  File.belongsTo(models.File, { as: "parent", foreignKey: "parent_id" });
};

module.exports = { File };
