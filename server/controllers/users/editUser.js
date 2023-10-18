const expressAsyncHandler = require('express-async-handler');
const User = require('../../model/UserModel');

const editUser = expressAsyncHandler(async (req, res) => {
    const data = req.body;

    const user = await User.findOneAndUpdate({ id: data.id }, { $set: data }, { returnDocument: 'after' });

    res.status(200).send(user);
});

module.exports = editUser;
