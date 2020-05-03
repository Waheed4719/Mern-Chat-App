const validator = require('validator')


const registerValidator = user => {
    let error = {}
    if(!user.email){
        error.email= "Please provide your email address"
    }
    else if(!validator.isEmail(user.email)) {
        error.email="Please provide a valid email address"
    }

    if(!user.name){
        error.name= "Please provide your name"
    }
   
    if(!user.pass){
        error.pass= "Please provide a strong password"
    }else if((user.pass).length < 6) {
        error.pass = "Password should contain more than 6 characters"
    }
   

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}




module.exports = registerValidator