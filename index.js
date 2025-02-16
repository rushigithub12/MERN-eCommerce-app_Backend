const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
const PORT = 8080;

server.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/ecommerce");
  console.log("=database connceced");
}

server.get("/", (req, res) => {
  res.json({
    status: "success",
  });
});

server.post("/products", createProduct);

server.listen(PORT, () => {
  console.log("listening to PORT " + PORT);
});
