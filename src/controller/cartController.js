const cartModel = require('../model/cartModel');


class cartController {
    getAllCart(req, res) {
        cartModel.find({})
            .then(carts => {
                res.status(200).send(carts);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Internal server error");
            });
    }
    getCartByAccountId(req, res) {
        const accountId = req.params.account_id; // Giữ nguyên dưới dạng String

        if (!accountId) {
            return res.status(400).json({ message: "account_id không hợp lệ" });
        }

        cartModel.find({ account_id: accountId }) // Tìm với account_id là String
            .then(cartItems => {
                if (!cartItems.length) {
                    return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
                }
                res.status(200).json(cartItems);
            })
            .catch(error => {
                console.error("Lỗi khi lấy giỏ hàng:", error);
                res.status(500).json({ message: "Lỗi server" });
            });
    }


    getCartById(req, res) {
        const { id } = req.params;
        cartModel.findById(id)
            .then(cart => {
                if (!cart) {
                    return res.status(404).send("Cart not found");
                }
                res.status(200).send(cart);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Internal server error");
            });
    }

    createCart(req, res) {
        const newCart = new cartModel(req.body);
        newCart.save()
            .then(cart => {
                res.status(201).json({ message: "Create Successful", cart });

            })
            .catch(error => {
                console.error(error);
                res.status(400).send("Failed to create cart");
            });
    }

    deleteProductFromCart(req, res) {
        const { account_id, product_id } = req.params;

        cartModel.findOneAndDelete({ account_id, product_id })
            .then(cart => {
                if (!cart) {
                    return res.status(404).send("Không tìm thấy sản phẩm trong giỏ hàng!");
                }
                res.status(200).send({ message: "Đã xóa sản phẩm khỏi giỏ hàng!" });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Lỗi server!");
            });
    }



    updateCartById(req, res) {
        const { id } = req.params;
        cartModel.findByIdAndUpdate(id, req.body, { new: true })
            .then(cart => {
                if (!cart) {
                    return res.status(404).send("Cart not found");
                }
                res.status(200).send({ message: "Updated Cart Completed" + cart });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Internal server error");
            });
    }
}

module.exports = new cartController();
