const pool = require("../db/connect");

const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, category, artisan, stock } =
      req.body;

    const result = await pool.query(
      `INSERT INTO products 
      (name, description, price, image_url, category, artisan, stock)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [name, description, price, image_url, category, artisan, stock]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, category, artisan, stock } =
      req.body;

    const result = await pool.query(
      `UPDATE products
       SET name=$1, description=$2, price=$3,
       image_url=$4, category=$5, artisan=$6, stock=$7
       WHERE id=$8
       RETURNING *`,
      [
        name,
        description,
        price,
        image_url,
        category,
        artisan,
        stock,
        req.params.id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};