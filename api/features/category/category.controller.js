const Category = require('./category.model');

const createCategory = async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }
    const category_add = new Category({ name, description });
    await category_add.save();
    res.status(201).json(category_add);
}

const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
}

module.exports = { createCategory, getAllCategories, deleteCategory };