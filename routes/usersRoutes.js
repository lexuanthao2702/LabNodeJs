var express = require("express");
var router = express.Router();
const modelUser = require("../models/User");

/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource user test");
});

// add data
router.post("/add", async (req, res) => {
  try {
    const model = new modelUser(req.body);
    const result = await model.save(); // them du lieu vao database
    if (result) {
      res.json({
        status: 200,
        message: "add success",
        data: result,
      });
    } else {
      res.json({
        status: 200,
        message: "add fail",
        data: [],
      });
    }
    // res.send(result)
  } catch (error) {
    console.log(error);
  }
});

// display list user
router.get("/list", async (req, res) => {
  const result = await modelUser.find({});
  try {
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// display list user getById
router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await modelUser.findById(req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.json({
        status: 400,
        message: "no find ID",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Invalid ID format");
    } else {
      console.log(error);
      res.status(500).send("Internal Sever Error");
    }
  }
});

// update user 
router.patch("/edit/:id", async (req, res) => {
  try {
    const result = await modelUser.findByIdAndUpdate(req.params.id, req.body);
    if (result) {
      const rs = await result.save();
      res.send(rs);
    } else {
      res.json({
        status: 400,
        message: "no find ID",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Invalid ID format");
    } else {
      console.log(error);
      res.status(500).send("Internal Sever Error");
    }
  }
});

// delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await modelUser.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({
        status: 200,
        message: "delete success",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "delete faill",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Invalid ID format");
    } else {
      console.log(error);
      res.status(500).send("Internal Sever Error");
    }
  }
});
module.exports = router;
