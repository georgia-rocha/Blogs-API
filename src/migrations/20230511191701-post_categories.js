'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', { 
      postId: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        odDelete: 'CASCADE',
        field: 'post_id',
        primaryKey: true,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        odDelete: 'CASCADE',
        field: 'category_id',
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    }); 
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('posts_categories')
  }
};
