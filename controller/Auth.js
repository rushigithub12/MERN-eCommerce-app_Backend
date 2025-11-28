const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (!err) {
          const user = new User({
            ...req.body,
            password: hashedPassword,
            salt,
          });
          const doc = await user.save();

          req.login(sanitizeUser(doc), (err) => {
            if (err) {
              res.status(400).json(err);
            } else {
              res.status(201).json(sanitizeUser(doc));
            }
          });
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  res.json(req.user); //passport
};

exports.checkUser = async (req, res) => {
  res.json(req.user); //passport
};
