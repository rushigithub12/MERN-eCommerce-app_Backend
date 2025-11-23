const express = require("express");
const server = express();
const mongoose = require("mongoose");
const swaggerDocs = require("./swagger");

const productsRouter = require("./routes/Product");
const brandsRouter = require("./routes/Brand");
const categoriesRouter = require("./routes/Category");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");

const cors = require("cors");

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json());

server.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

server.use("/products", productsRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/category", categoriesRouter.router);
server.use("/users", userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);

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
  swaggerDocs(server);
});
