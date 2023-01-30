const mongoose = require('mongoose')
require('dotenv').config()
 const result =  mongoose.connect(process.env.MONGOOSE_URL);


module.exports = 
{
    result
}



