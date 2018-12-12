const checkIfRedFlag = (req) => {
  const redFlag = 'red-flag';
  const myPattern = new RegExp('(\\w*' + redFlag + '\\w*)', 'gi');
  const matches = String(req.originalUrl).match(myPattern);
  if (matches) {
    return true;
  }
  return false;
};

export default checkIfRedFlag;
