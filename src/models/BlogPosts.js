module.exports = (sequelize, DataTypes) => {
    const BlogPosts = sequelize.define(
      'BlogPosts',
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      published: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      updated: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
      {
        timestamps: false,
        tableName: 'blog_posts',
        underscored: true,
      },
    );
  
    return BlogPosts;
  };