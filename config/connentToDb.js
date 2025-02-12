const mongoose = require("mongoose");



module.exports = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connect to DB ^_^");
    } catch (error) {
        console.log("Connection failed to DB ): "  , error);
    }
}