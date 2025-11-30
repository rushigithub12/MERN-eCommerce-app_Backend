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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmMxOTk3ZTk0ZTg1YzRmMTIyNWE3NyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDUyNDgzMX0.2YbT6BNaQEZDm5RiiH_LgCcG185ZPt2xOb3W2m2mzRg";
  return token;
};
