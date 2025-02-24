// hbs register function
const isEqual = (a, b) => {
  return a === b;
};

const calNumOrder = (index, start) => {
  return index + start;
};

const isSelected = (selected, value) => {
  return selected.toString() === value.toString();
};

module.exports = { isEqual, calNumOrder, isSelected };
