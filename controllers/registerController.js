const bcrypt = require('bcrypt');
const registration = require('../dbConfig/model/resgistrationModel');


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
        const savedNewUser = newUser.save();

        console.log(savedNewUser);
        res.status(200).json(`Hello ${user} this is your email address: ${email} and Hashed password:${hashedPwd}`);

    } catch (error){
        console.error();
    };
    
}

const logInUser = async (req, res) => {
    const { logEmail, logInPwd } = req.body;
    const userDetails = await registration.findOne({userEmail: logEmail}).exec();
    
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