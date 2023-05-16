module.exports = (sequelize, DataTypes) => {
    const BlogPosts = sequelize.define(
      'BlogPost',
      {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },     
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      published: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
      {
        timestamps: false,
        tableName: 'blog_posts',
        underscored: true,
      },
    );

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
    return BlogPosts;
  };