module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return Users;
};
