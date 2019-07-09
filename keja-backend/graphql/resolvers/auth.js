
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

const userAuth = {
    createUser: async args => {
        try{
        const available = await User.findOne({ email: args.userInput.email})
            if (available){
                throw new Error('User exists.')
            }
            const hashedpwd = await bcrypt.hash(args.userInput.password, 12);
            const user = new User ({
                userName: args.userInput.userName,
                email: args.userInput.email,
                password: hashedpwd  
            });
            const result = await user.save();
            return {...result._doc, password: null};
    }catch(err){
        throw err;
    };
    }
};


module.exports = userAuth;