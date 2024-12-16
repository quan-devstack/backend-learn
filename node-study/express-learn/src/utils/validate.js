const getError = (errs, name) => {
  if (errs.length) {
    errs = errs[0];
    return errs[name];
  }
};

module.exports = getError;
