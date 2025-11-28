const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: Buffer, required: true },
  role: { type: String, required: true, default: "user" },
  addresses: { type: [Schema.Types.Mixed] },
  name: { type: String, required: true, default: "Name 1" },
  orders: { type: [Schema.Types.Mixed] },
  salt: Buffer,
});

userSchema.set("strictQuery", false);
const virtual = userSchema.virtual("id"); //to replace _id with id as required for frontend side

virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.User = mongoose.model("User", userSchema);
