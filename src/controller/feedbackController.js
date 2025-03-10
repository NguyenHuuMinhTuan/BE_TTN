const Feedback = require('../model/feedbackModel')

class FeedbackController {
    async getAllFeedback(req, res) {
        try {
            const feedback = await Feedback.getAll();
            res.status(201).json(feedback)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async createFeedback(req, res) {
        try {
            console.log("Request body:", req.body);

            const { star, comment, account_id, product_id } = req.body;

            const newFeedback = { star, comment, account_id, product_id };

            const result = await Feedback.create(newFeedback);

            console.log("Insert result:", result);

            if (result?.affectedRows > 0) {
                res.status(201).json({ message: 'Create Feedback successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create Feedback' });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateFeedback(req, res) {
        try {
            const { id } = req.params;
            const { star, comment, account_id, product_id } = req.body;

            if (!star || !comment || !account_id  ||!product_id) {
                return res.status(400).json({ message: 'At least one field is required for update' });
            }

            const updatedFeedback = { star, comment, account_id, product_id };
            const result = await Feedback.update(id, updatedFeedback);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Feedback updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update Feedback' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteFeedback(req, res) {
        try {
            const { id } = req.params;
            const result = await Feedback.remove(id);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Feedback deleted successfully' });
            } else {
                res.status(400).json({ message: 'Failed to delete Feedback' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new FeedbackController;