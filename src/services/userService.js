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

    async login(data){
        try {
            const email = data.email;
            const incomingPassword = data.password;
            const user = await userRepository.getByEmail(email);
            if(user){
                const passwordMatch = await user.comparePassword(incomingPassword);
                if(passwordMatch){
                    return user;
                }else{
                    return 0;
                }
            }else{
                return 0;
            }
        } catch (error) {
            throw error;
        }
    }
}




module.exports = UserService;

