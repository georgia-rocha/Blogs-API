const BlogPosts = require("./BlogPost");

module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
      'PostCategory',
      {
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'post_id',
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'category_id',
      },
      },
      {
        timestamps: false,
        tableName: 'posts_categories',
        underscored: true,
      },
    );

    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        as: 'posts',
        through: PostCategory,
        foreignKey: 'category_id',
      })
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'post_id',
      });
    };
  
    return PostCategory;
  };