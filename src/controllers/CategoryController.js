const categoryService = require('../services/CategoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name || name === undefined) {
      return res.status(400).json({ message: '"name" is required' });
    }
    const category = await categoryService.createCategory(name);

    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getCategoriesAll = async (req, res) => {
  try {
    const categories = await categoryService.getCategoriesAll();

    if (categories.message) return res.status(404).json(categories);
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

module.exports = {
  createCategory,
  getCategoriesAll,
};
