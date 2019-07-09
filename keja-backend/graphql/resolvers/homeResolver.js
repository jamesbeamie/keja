const Home = require('../../models/home');
const { transformHome } = require('../resolvers/merge');


const homeResolver = {
    homes: async () => {
        try {
        const homes = await  Home.find()
            return homes.map(home => {
                return transformHome(home);
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
            createdHome = transformHome(res);
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
    }
};


module.exports = homeResolver;