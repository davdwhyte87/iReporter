import check from 'express-validator/check';
/**
 * @param {Object} req - inccoming request object
 * @param {Object} res - response object
 * @param {Object} next - next object
 * @return {Object} res - response object
 */
async function handleValidation(req, res, next) {
  const errorFormatter = ({ msg }) => msg;
  const errors = check.validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, error: errors.array({ onlyFirstError: true }) });
  }
  next();
}
export default handleValidation;
