const User = require('../models/user');

class UserRepository{

    async create(data){
        try {
            console.log(data);
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;