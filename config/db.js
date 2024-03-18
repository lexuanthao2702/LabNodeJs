const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const atlat = "mongodb+srv://thaolxpd08350:3osJXgrbezFX0MKD@cluster0.v0fnioe.mongodb.net/myDB?retryWrites=true&w=majority&appName=Cluster0";
const connect = async () => {
  try {
    await mongoose.connect(atlat, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect success");
  } catch (error) {
    console.log("connect faill");
    console.log(error);
  }
};

module.exports = {connect};