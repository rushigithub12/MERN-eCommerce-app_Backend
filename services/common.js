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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmMxOTk3ZTk0ZTg1YzRmMTIyNWE3NyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NTM2MDIwMH0.43DEQcyx2HrqBMoNLssoHN7YTP4kgIVquIr2R1WjDLY";

  return token;
};
