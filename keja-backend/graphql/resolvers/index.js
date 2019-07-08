
const bcrypt = require('bcryptjs');

const Home = require('../../models/home');
const User = require('../../models/user');
const Booking = require('../../models/bookings');

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

const singleHome = async homeId => {
    console.log('homeId', homeId);
    try{
        const specificHome = await Home.findById(homeId);
        return {
            ...specificHome._doc, 
            _id: specificHome.id,
            creator: user.bind(this, specificHome.creator)
        }
    } catch(err){
        throw err;
    }
}

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

    bookings: async () => {
        try{
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return {
                    ...booking._doc, 
                    _id: booking.id,
                    user: user.bind(this, booking._doc.user),
                    home: singleHome.bind(this, booking._doc.home)
                    // createdAt: new Date(booking._doc.createdAt).toISOString, 
                    // updatedAt: new Date(booking._doc.updatedAt).toISOString
                }
            });
        } catch(err){
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
    },

    bookHome: async args => {
        const fetchedHome = await Home.findOne({_id: args.homeId});
       const booking = new Booking({
           user:'5d1475e80b6be54627b116a3',
           home: fetchedHome
       }); 
       const result = await booking.save();
       return {
           ...result._doc, 
           _id: result.id,
           user: user.bind(this, booking._doc.user),
           home: singleHome.bind(this, booking._doc.home)
        //    createdAt: new Date(result._doc.createdAt).toISOString, 
        //    updatedAt: new Date(result._doc.updatedAt).toISOString
        }
    },

    cancelBooking: async args => {
        try{
            const abooking = await Booking.findById(args.bookingId).populate('home');

        console.log('specificHome', abooking.user);
            const home = {
                ...abooking.home._doc, 
                _id: abooking.home.id,
                creator: user.bind(this, abooking.user)
             }
            await Booking.deleteOne({_id: args.bookingId});
            return home;
        }catch (err){
            throw err;
        }
    }
};


module.exports = graphQLresolver;