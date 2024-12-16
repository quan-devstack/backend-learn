const bcrypt = require("bcrypt");

const hashString = (string) => {
  let salt = 8;
  return bcrypt.hashSync(string, salt);
};

const compareString = (input, data) => {
  return bcrypt.compareSync(input, data);
};

module.exports = { hashString, compareString };
