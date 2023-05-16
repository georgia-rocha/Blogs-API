const { BlogPost, PostCategory, Category } = require('../models');

const createPost = async (title, content, categoryIds, userId) => {
  const category = categoryIds.some(async (id) => Category.findOne({ where: { id } }));

  if (!category) {
    return ({ message: 'one or more "categoryIds" not found' });
  }

  const newPost = await BlogPost.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });

  console.log(categoryIds);
  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId: newPost.id, categoryId });
  }));
  return newPost;
};

module.exports = {
  createPost,
};
