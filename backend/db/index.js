const mongoose = require('mongoose');

module.exports.connect = async () => {
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        await mongoose.connect(process.env.db_url, mongooseOpts);
    } catch (error) {
        console.log("Error occurred while connection to db", error)
    }
}
