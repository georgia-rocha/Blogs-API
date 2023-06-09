const { Op } = require('sequelize');
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
      ],
    });

    return blogPosts;
  } catch (error) {
    console.log(error);
    return ({ message: 'Nenhum Post encontrado' });
  }
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return ({ message: 'Post does not exist' });
  return post;
};

const updatePostById = async (id, title, content) => {
  console.log(id, title, content);
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  const updated = await getPostById(id);
  return updated;
};

const deletePostById = async (id) => {
  try {
    await PostCategory.destroy({ where: { postId: id } });

    const deleteBlogPost = await BlogPost.destroy({ where: { id } });
    console.log({ deleteBlogPost });
    return deleteBlogPost;
  } catch (error) {
    console.log(error);
  }
};

const getPostByName = async (name) => {
  try {
    const posts = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${name}` } },
          { content: { [Op.like]: `%${name}` } },
        ],
      },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return posts;
  } catch (error) {
    console.log(error);
    return ({ message: 'Nenhum Post encontrado' });
  }
};

module.exports = {
  createPost,
  getPostsAll,
  getPostById,
  updatePostById,
  deletePostById,
  getPostByName,
};
