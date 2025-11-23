const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  cartItems: { type: [Schema.Types.Mixed], required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  totalAmount: { type: Number },
  totalitems: { type: Number },
  paymentMethod: { type: String, required: true },
  selectedAddress: { type: Schema.Types.Mixed, required: true },
  status: { type: String, default: "pending", required: true },
});

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model("Order", orderSchema);
