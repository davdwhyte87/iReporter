import check from 'express-validator/check';

const validate=(method) => {
    switch (method) {
        case 'create': {
            return [
                check.body('title', 'a valid title is needed').exists().isLength({ min: 5 }),
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
    let x='k';
    return res.status(200).json({ status: 200, data: [x] });
};
export { validate, create };
