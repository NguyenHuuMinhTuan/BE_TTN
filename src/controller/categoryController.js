const Category = require('../model/categoryModel')

class CategoryController {
    async getAllCategoty(req, res) {
        try {
            const category = await Category.getAll();
            res.status(201).json(category)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async createCategory(req, res) {
        try {
            console.log("Request body:", req.body);

            const { name } = req.body;

            const newCategory = { name };

            const result = await Category.create(newCategory);

            console.log("Insert result:", result);

            if (result?.affectedRows > 0) {
                res.status(201).json({ message: 'Create categoty successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create category' });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ message: 'At least one field is required for update' });
            }

            const updatedCategory = { name };
            const result = await Category.update(id, updatedCategory);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Category updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update category' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const result = await Category.remove(id);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Category deleted successfully' });
            } else {
                res.status(400).json({ message: 'Failed to delete category' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new CategoryController;