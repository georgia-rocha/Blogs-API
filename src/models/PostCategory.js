module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
      'PostCategory',
      {
   
      },
      {
        timestamps: false,
        tableName: 'posts_categories',
        underscored: true,
      },
    );
  
    return PostCategory;
  };