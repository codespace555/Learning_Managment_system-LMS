// import module.................................
const mongoose = require("mongoose");
require("dotenv").config();
const Mongo_url = process.env.MONGO_URI;
// here connect to database.......................
mongoose.set("strictQuery",false)
const dbconnect = () => {
  mongoose
    .connect(Mongo_url) //mongoDB Url
    .then((conn) => console.log(`connect to ${conn.connection.host} `))
    .catch((e) => {
      console.log(e.messsge);
      process.exit(1);
    });
};

// .................. export it to use wherever needed

module.exports = dbconnect;
