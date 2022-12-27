const validate = (req, res) => {
    if(!req.body.lesson||req.body.lesson.length<3) {
        res
        .status(400).send('Lesson must be at least 3 characters long')
        .send('lesson must be at least 3 characters long');
        return;
    }
};
module.exports = validate;