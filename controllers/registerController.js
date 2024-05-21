const bcrypt = require('bcrypt');
//const registration = require('../dbConfig/reg');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    userName: {type: String, require: true},
    userEmail: {type: String, require: true},
    userPassword: {type: String, require: true}
});

const model = mongoose.model('Registrationdb', registrationSchema);

const regNewUser = async (req, res) => {
    const { user, email, pwd } = req.body;
    const duplicateEmail = await model.findOne({ userEmail: email }).exec();
    if(duplicateEmail) return res.sendStatus(409);

    try{
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = await model.create({
            userName: user,
            userEmail: email,
            userPassword: hashedPwd
        });

        console.log(newUser);
        res.status(200).json(`Hello ${user} this is your email address: ${email} and Hashed password:${hashedPwd}`);

    } catch (error){
        console.error();
    };
    
}

const logInUser = async (req, res) => {
    const { logEmail, logInPwd } = req.body;
    const userDetails = await model.findOne({userEmail: logEmail}).exec();
    
try { const valideEmail = userDetails["userEmail"];
    if(!valideEmail) return res.sendStatus(409);
    console.log(userDetails["userEmail"]);
    console.log(userDetails["userPassword"]);

    await bcrypt.compare(logInPwd, userDetails["userPassword"])? res.sendStatus(200):  res.status(500).json({'message': "Bad request"});
} catch (err) {
    res.status(500).json({'message': err.message})
}
};

module.exports = {
    regNewUser,
    logInUser
};