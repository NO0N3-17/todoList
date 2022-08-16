const mongoose = require('mongoose')
const schema = mongoose.Schema;
const bcrypt = require('bcrypt')

//Login Schema
const loginSchema = new schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true

    },
    toDoList:{
        type: [String],
        require: true
    },
    endDate:{
        type: [Date]
    }
});


// User login 
loginSchema.statics.login = async function(username, password){
    const user = await this.findOne({ username });
    if(user){
        const auth = await bcrypt.compareSync(password,user.password);
        if(auth){
            return user
        }
    }
}


//Models

const loginModel = mongoose.model("logins",loginSchema);


//Module Exports

module.exports = { loginModel };