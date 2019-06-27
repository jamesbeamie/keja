
const bcrypt = require('bcryptjs');

const Home = require('../../models/home');
const User = require('../../models/user');

const homes = async homeIds => {
    try{
    const homes = await Home.find({_id: { $in: homeIds}})
          homes.map(home => {
            return {
                ...home._doc, 
                _id: home.id, 
                creator: user.bind(this, home.creator)
            };
        });
        return homes;
    } catch (err){
        throw  err;
    }
    };

const user = async userId => {
    try{
    const user = await User.findById(userId)
        return {
            ...user._doc, 
            _id: user.id, 
            createdHomes: homes.bind(this, user._doc.createdHomes)
            };
        } catch(err){
            throw err;
        }
    }   

const graphQLresolver = {
    homes: async () => {
        try {
        const homes = await  Home.find()
            return homes.map(home => {
                return {
                    ...home._doc,
                    creator: user.bind(this, home._doc.creator)
                };
            })
        }catch(err){
            throw err;
        }
    },

    addHome: async args => {
        const newHome = new Home({
            name: args.homeInput.name,
            homeType: args.homeInput.homeType,
            price: +args.homeInput.price,
            // datePosted: new Date(args.homeInput.date)
            creator: '5d1475e80b6be54627b116a3'
        });
        let createdHome;
        try{
        // homes.push(newHome);
        const res = await newHome
        .save()
            createdHome = {...res._doc, creator: user.bind(this, res._doc.creator)};
            const creator = await User.findById('5d1475e80b6be54627b116a3')
            // console.log(res)
            // return {...res._doc};
            if (!creator){
                throw new Error('User does not exist .')
            }
            creator.createdHomes.push(newHome);
            await creator.save();
            return createdHome
        }catch(err) {
            throw err;
        };
        // return newHome;
    },

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


module.exports = graphQLresolver;