require('dotenv').config();
const express = require('express');
const db = require('./db/mongoose');
const itemController = require('./controllers/itemController');
const User = require('./db/models/user');
const Item = require('./db/models/item');
const Outfit = require('./db/models/outfit');

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.get("/")


// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render( "index");
});

// Item Routes
app.get('/items', itemController.getAllItems);
app.post('/items', itemController.createItem);
app.patch('/items/:id', itemController.updateItem);
app.delete('/items/:id', itemController.deleteItem);

// Function to seed sample data
const initialData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Item.deleteMany({});
        await Outfit.deleteMany({});

        // Create sample users
        const users = await User.insertMany([
            { name: 'Alicia', email: 'alicia@example.com' },
            { name: 'Courtnei', email: 'courtnei@example.com' },
            { name: 'Davia', email: 'davia@example.com' },
            { name: 'Tai', email: 'tai@example.com' },
            { name: 'Jaquez', email: 'jaquez@example.com' }
        ]);

        // Create sample items
        const items = await Item.insertMany([
            { name: 'Red Dress', category: 'Dresses', color: 'Red', user: users[0]._id },
            { name: 'Blue Jeans', category: 'Pants', color: 'Blue', user: users[1]._id },
            { name: 'White T-Shirt', category: 'Tops', color: 'White', user: users[2]._id },
            { name: 'Black Heels', category: 'Shoes', color: 'Black', user: users[3]._id },
            { name: 'Green Jacket', category: 'Outerwear', color: 'Green', user: users[4]._id }
        ]);

        // Create sample outfits
        await Outfit.insertMany([
            { name: 'Casual Chic', items: [items[0]._id, items[1]._id], user: users[0]._id },
            { name: 'Office Smart', items: [items[2]._id, items[3]._id], user: users[1]._id },
            { name: 'Weekend Getaway', items: [items[4]._id, items[0]._id], user: users[2]._id },
            { name: 'Night Out', items: [items[1]._id, items[3]._id], user: users[3]._id },
            { name: 'Winter Warmth', items: [items[2]._id, items[4]._id], user: users[4]._id }
        ]);

        console.log('Sample data added!');
    } catch (err) {
        console.error('Error sending data:', err.message);
    }
};

// Data when the server starts
initialData();

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

