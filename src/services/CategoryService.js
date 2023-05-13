const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });

  if (!newCategory) {
    return ({ message: 'Não é possível criar a categoria' });
  }
  return newCategory;
};

module.exports = {
    createCategory,
};
