const billMongoModel = require('../model/BillMongoModel')

class billMongoController {
    getAllBill(req, res) {
        billMongoModel.find({})
            .then(bills => {
                res.status(200).send(bills);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Internal server error");
            });
    }
    getCartByAccountId(req, res) {
        const accountId = req.params.account_id;

        if (!accountId) {
            return res.status(400).json({ message: "account_id không hợp lệ" });
        }

        billMongoModel.find({ account_id: accountId })
            .then(billItems => {
                if (!billItems.length) {
                    return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
                }
                res.status(200).json(billItems);
            })
            .catch(error => {
                console.error("Lỗi khi lấy giỏ hàng:", error);
                res.status(500).json({ message: "Lỗi server" });
            });
    }


    createBill(req, res) {
        const newBills = new billMongoModel(req.body);
        newBills.save()
            .then(cart => {
                res.status(201).json({ message: "Create Successful", newBills });

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



    async updateCartByAccountId(req, res) {
        try {
            const { account_id } = req.params;
            const updateData = req.body;

            // Kiểm tra xem có giá trị feedback trong request hay không
            if (updateData.feedback !== undefined) {
                updateData.feedback = Boolean(updateData.feedback); // Đảm bảo giá trị là true/false
            }

            const updatedCart = await cartModel.findOneAndUpdate(
                { account_id },  // Tìm theo account_id
                updateData,
                { new: true }    // Trả về bản ghi sau khi cập nhật
            );

            if (!updatedCart) {
                return res.status(404).json({ message: "Cart not found for this account_id" });
            }

            res.status(200).json({
                message: "Updated Cart Successfully",
                updatedCart
            });
        } catch (error) {
            console.error("Error updating cart:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

}

module.exports = new billMongoController();
