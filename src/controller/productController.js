const Product = require('../model/productModel.js');

class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.getAll();
            res.status(201).json(products)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async createProduct(req, res) {
        try {
            console.log("Request body:", req.body);

            const { name, price, urlImg, des, status, discount, category_id, quantity } = req.body;

            const ConvertPrice = Number(price)

            const ConvertDiscount = Number(discount)

            const ConvertStatus = Number(status)

            const price_sales = ConvertPrice * (1 - ConvertDiscount / 100);

            const newProduct = { name, price: ConvertPrice, urlImg,des, status: ConvertStatus, discount: ConvertDiscount, price_sales, category_id, quantity };

            const result = await Product.create(newProduct);

            console.log("Insert result:", result);

            if (result?.affectedRows > 0) {
                res.status(201).json({ message: 'Create product successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create product' });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;

            const { name, price,urlImg, des, status, discount, category_id, quantity } = req.body;

            const ConvertPrice = Number(price)

            const ConvertDiscount = Number(discount)

            const ConvertStatus = Number(status)

            const price_sales = ConvertPrice * (1 - ConvertDiscount / 100);

            if (!name && !price &&!urlImg &&! des && !status && !discount && !price_sales && !category_id && !quantity) {
                return res.status(400).json({ message: 'At least one field is required for update' });
            }

            const updatedProduct = { name, price: ConvertPrice, urlImg, des, status: ConvertStatus, discount: ConvertDiscount, price_sales, category_id, quantity };
            const result = await Product.update(id, updatedProduct);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Product updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update product' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const result = await Product.remove(id);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Product deleted successfully' });
            } else {
                res.status(400).json({ message: 'Failed to delete product' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new ProductController;