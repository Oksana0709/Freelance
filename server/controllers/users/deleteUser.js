const expressAsyncHandler = require('express-async-handler');
const User = require('../../model/UserModel');


const deleteUser = expressAsyncHandler(async (req, res) => {
    const data = req.body;

    const user = await User.findOneAndDelete({ id: data.id });

    res.status(200).send(user);
});

module.exports = deleteUser;
