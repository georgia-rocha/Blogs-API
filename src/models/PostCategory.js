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
        references: {
          model: 'blog_posts',
          key: 'id',
        }
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'category_id',
        references: {
          model: 'categories',
          key: 'id',
        }
      },
      },
      {
        timestamps: false,
        tableName: 'posts_categories',
        underscored: true,
      },
    );

    PostCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'postId',
        through: PostCategory,
        foreignKey: 'post_id',
      });
      models.Category.belongsToMany(models.BlogPost, {
        as: 'categoryId',
        through: PostCategory,
        foreignKey: 'category_id',
      })
    };
  
    return PostCategory;
  };