const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });

  if (!newCategory) {
    return ({ message: 'Não é possível criar a categoria' });
  }
  return newCategory;
};

const getCategoriesAll = async () => {
    const categories = await Category.findAll();

    if (!categories.length) {
        return ({ message: 'Nenhuma categoria encontrada' });
    }
    return categories;
};

module.exports = {
    createCategory,
    getCategoriesAll,
};
