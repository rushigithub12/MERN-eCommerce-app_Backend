const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandSchema = new Schema({
  value: { type: String, require: true, unique: true },
  label: { type: String, require: true, unique: true },
});

const virtual = brandSchema.virtual("id"); //to replace _id with id as required for frontend side

virtual.get(function () {
  return this._id;
});
brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Brand = mongoose.model("Brand", brandSchema);
