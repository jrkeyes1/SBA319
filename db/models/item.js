const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});


itemSchema.index({ name: 1 }); 
itemSchema.index({ category: 1 }); 

itemSchema.path('name').validate(function (name) {
    return name && name.length > 2;
}, 'Item name must be at least 3 characters long');


module.exports = mongoose.model('Item', itemSchema);

