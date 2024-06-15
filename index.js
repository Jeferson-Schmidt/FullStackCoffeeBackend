const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
const app = express();

app.use(cors()) 

const Product = require("./models/product.model");

app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body.form, {
            new: true
          })
        if(!product) {
            return res.status(404).json({message: "Product not found"})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.delete("/api/products/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product) {
            return res.status(404).json({message: "Produdct not found"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("API works");
});

mongoose
  .connect(
    "mongodb+srv://abcd:Ad1f8dff3c@nodejs.ypecmbu.mongodb.net/?retryWrites=true&w=majority&appName=nodejs"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
