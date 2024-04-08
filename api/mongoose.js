const mongoose = require("mongoose");
const URI = "mongodb+srv://minhquan:minhquan@cluster0.d9zikqm.mongodb.net/";

console.log(URI);

const connectToDB = () => {
  mongoose
    .connect(URI, {
      
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.error(err));
};

module.exports = connectToDB;
