const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const regNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    
    const hashedPwd = await bcrypt.hash(pwd, 10);
    res.status(200).json({"username": user, "password": hashedPwd});
}

const logInUser = async (req, res) => {
    const { logEmail, logInPwd } = req.body;
}

module.exports = {
    regNewUser,
    logInUser
};