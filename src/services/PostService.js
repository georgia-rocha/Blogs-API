const { BlogPost, PostCategory, Category, User } = require('../models');

const createPost = async (title, content, categoryIds, userId) => {
  const category = await Promise.all(categoryIds
    .map(async (id) => Category.findOne({ where: { id } })));

  if (!category.every((categoryId) => categoryId)) {
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

const getPostsAll = async () => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
    
    return blogPosts;
  } catch (error) {
    console.log(error);
    return ({ message: 'Nenhum Post encontrado' });
  }
};

module.exports = {
  createPost,
  getPostsAll,
};
