module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        displayName: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        image: {
          type: DataTypes.STRING,
        }
      },
      {
        timestamps: false,
        tableName: 'users',
        underscored: true,
      },
    );
  
    return User;
  };