const { authSchema } = require("../helpers/validationSchema");
const User = require("../models/usermodel");
const router = require('express');
const router =express.Router();

Router.post('/register', async (req, res, next) => {
    try{
        const result = await authSchema.validateAsync(req.body);

        const Exists = await User.findOne({email:email})

        if (Exists) throw createError.Conflict(`${email} is already been registerd`)
            const User = new User(result)

        const savedUser = await User.save()

        res.send({savedUser});
    }catch (error){
        if(error.isJoi === true)error.status =422
        next(error)
    }
    
})