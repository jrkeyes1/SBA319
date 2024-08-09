const Item = require('../db/models/item');

// GET all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find().populate('user');
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST a new item
exports.createItem = async (req, res) => {
    const { name, category, color, user } = req.body;

    const item = new Item({
        name,
        category,
        color,
        user
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PATCH an item
exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE an item
exports.deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
