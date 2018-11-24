import check from 'express-validator/check';


// temporary in memory storage
let database=[];
const validate=(method) => {
    switch (method) {
        case 'create': {
            return [
                check.body('title', 'a valid title is needed').exists(),
                check.body('title', 'Title is too short, at least 5 characters').isLength({ min: 5 }),
                check.body('comment', 'a valid comment is required').exists().isLength({ min: 5 }),
                check.body('type', 'You need to selected a type').exists(),
            ];
        }
        default: {
            return [];
        }
    }
};
const create=(req, res) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return msg;
      };
    let errors=check.validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(404).json({ status: 404, error: errors.array({ onlyFirstError: true }) });
    }
    let x='k';
    return res.status(200).json({ status: 200, data: [x] });
};

export { validate, create };
