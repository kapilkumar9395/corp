const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        require: true,
        index: true
    },
    password: {
        type: String,
        require: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.userRegister = function(newUser){
        console.log(newUser);
        let error = false;
        return new Promise((resolve, reject) => {
            // Hashing Password
            bcrypt.genSalt(10, function(err, salt){
                if(err){reject("Something wend wrong: "+err);}
                else{
                    bcrypt.hash(newUser.password, salt, function(err, hash){
                        if(err){reject("Something wend wrong: "+err);}
                        else{
                            newUser.password = hash;
                            newUser.save(function(err, user){
                                if(err){reject(err);}
                                else{
                                    resolve("Done");
                                }
                            });
                        }
                    });
                }
            });
        });
}

module.exports.authenticateUser = function(user){
    const query = {username: user.username}
    return new Promise((resolve, reject) => {
        User.findOne(query, function(err, result){
            if(err) reject(err);
            else{
                bcrypt.compare(user.password, result.password)
                .then((res) => {
                    if(res) {resolve(result);}
                    else reject("Wrong Password");
                });
            }
        });
    });
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}