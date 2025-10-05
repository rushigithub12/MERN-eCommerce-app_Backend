const express = require("express");
const server = express();
const mongoose = require("mongoose");
const productsRouter = require("./routes/Product");

server.use(express.json());

server.use("/products", productsRouter.router);

main().catch((err) => console.log("err==>>", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("database connnected");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(8080, () => {
  console.log("server running");
});
