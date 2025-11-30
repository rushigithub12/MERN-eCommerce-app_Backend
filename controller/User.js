const { User } = require("../model/User");
const { sanitizeUser } = require("../services/common");

exports.fetchUserById = async (req, res) => {
  try {
    const { id } = await req.user;
    const user = await User.findById(id).exec();
    res
      .status(200)
      .json({
        id: user.id,
        addresses: user.addresses,
        email: user.email,
        role: user.role,
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = await req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
};
