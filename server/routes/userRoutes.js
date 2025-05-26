const express = require('express')
const router = express.Router()

// import db connection
const connection = require('../config/db')

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'API Calling.....' })
})

// Add to favorites (Product)
router.post("/addtocart", async (req, res) => {
    const { product_id, title, price, image } = req.body;

    try {
        // 1. Check if the product is already in favorites
        const [existing] = await connection.execute("SELECT * FROM cart WHERE product_id = ?", [product_id]);
        if (existing.length > 0) {
            return res.status(409).json({ error: "Product already in favorites" });
        }

        // 2. Insert the product into favorites
        const insertSql = `
            INSERT INTO cart 
            (product_id, title, price, image) 
            VALUES (?, ?, ?, ?)
        `;
        await connection.execute(insertSql, [product_id, title, price, image]);
        
        res.status(201).json({ success: true, message: "Product added to cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add product to cart" });
    }
});

router.get('/addtocart', async (req, res) => {
    try {
        const [result] = await connection.execute("SELECT * FROM cart");
                const total = result.reduce((acc, item) => acc + parseFloat(item.price), 0);

        res.json(result,total);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// DELETE route to remove product from cart by ID
router.delete('/addtocart/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await connection.execute("DELETE FROM cart WHERE product_id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        res.json({ success: true, message: "Removed from cart" });
        console.log("Removed product from cart:", id);
    } catch (err) {
        console.error("Error removing from cart:", err);
        res.status(500).json({ error: "Failed to remove from cart" });
    }
});




module.exports = router;
