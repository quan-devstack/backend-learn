const numeral = require("numeral");

// format price
const formatPrice = (price) => {
  return numeral(price).format("0,0");
};

module.exports = { formatPrice };
