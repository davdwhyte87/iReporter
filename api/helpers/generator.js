/**
 * This function creates a random id
 * @returns {int} - this returns random id
 */
const createId = () => {
  const id = Math.floor(Math.random() * 90000000000) + 100000000000;
  return id;
};

export default createId;
