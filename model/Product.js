const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: {
    type: Number,
    min: [1, "wrong min price"],
    max: [10000, "wrong max price"],
  },
  stock: { type: Number, min: [0, "wrong min stock"], default: 0 },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  rating: {
    type: Number,
    min: [0, "wrong min discout"],
    max: [5, "wrong max discout"],
    default: 0,
  },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discout"],
    max: [99, "wrong max discout"],
    default: 0,
  },
  deleted: { type: Boolean, default: false },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Product = mongoose.model("Product", productSchema);
