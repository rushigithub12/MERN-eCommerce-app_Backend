const { User } = require("../model/User");

exports.fetchUserById = async (req, res) => {
  try {
    const { id } = await req.params;
    const user = await User.findById(id, "name, email, id").exec();
    res.status(200).json(user);
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
