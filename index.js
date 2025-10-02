const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");

server.use(express.json()); //parse req body coming from frontend

main().catch((err) => console.log("err==>>", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("database connnected");
}

server.get("/", (req, res) => {
  res.json({ status: "sucsess" });
});

server.post("/products", createProduct)

server.listen(8080, () => {
  console.log("server running");
});
