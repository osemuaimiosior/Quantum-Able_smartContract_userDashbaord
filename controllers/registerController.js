const bcrypt = require('bcrypt');
const registration = require('../dbConfig/reg');


const regNewUser = async (req, res) => {
    const { user, email, pwd } = req.body;
    const duplicateEmail = await registration.findOne({ userEmail: email }).exec();
    if(duplicateEmail) return res.sendStatus(409);

    try{
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = await registration.create({
            userName: user,
            userEmail: email,
            userPassword: hashedPwd
        });

        console.log(newUser);
        res.status(200).json(`Hello ${user} this is your ${email} and Hashed password ${hashedPwd}`);

    } catch (error){
        console.error();
    };
    
}

const logInUser = async (req, res) => {
    const { logEmail, logInPwd } = req.body;
}

module.exports = {
    regNewUser,
    logInUser
};