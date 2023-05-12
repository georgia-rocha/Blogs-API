module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
      'PostCategory',
      {
        id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
   
      },
      {
        timestamps: false,
        tableName: 'posts_categories',
        underscored: true,
      },
    );
  
    return PostCategory;
  };