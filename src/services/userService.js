const UserRepository = require("../repository/userRepository");

const userRepository = new UserRepository();
class UserService{
    async create(data){
        try {
            const user = await userRepository.create(data);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;

