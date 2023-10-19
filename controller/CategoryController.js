const Category = require('../Model/CategoryModel');


const addCategory = async (req, res) => {
  try {
    const { name, picture } = req.body;

    const category = new Category({
      name,
      picture,
      isHide: true,
    });
    const newCategory = await category.save();
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const data = req.body;
    const updateCategory = await Category.findByIdAndUpdate(categoryId,data,{new: true})
    if (!updateCategory) {
      return res.status(404).json({ success: false, error: 'Danh mục không tồn tại' });
    }
    res.status(201).json({ success: true, data: updateCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const categories = await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { addCategory,updateCategory,getAllCategories,deleteCategory };
