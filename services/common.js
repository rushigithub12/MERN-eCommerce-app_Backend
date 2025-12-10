const passport = require("passport");

exports.isAuth = () => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmMxOTk3ZTk0ZTg1YzRmMTIyNWE3NyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDc4MTE1MH0.lERJCUMr14K09Um4La8eZweIW0cthH1TragetHcp2Ts";

  return token;
};
