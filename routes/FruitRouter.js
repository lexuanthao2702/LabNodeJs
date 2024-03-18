var express = require("express");
var router = express.Router();
const modelFruit = require("../models/Fruit");

/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource Fruitbutor test");
});

// add data ----------------------------------------------------------
router.post("/add", async (req, res) => {
  try {
    const model = new modelFruit(req.body);
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

// display list user ----------------------------------------------------------
router.get("/list", async (req, res) => {
  const result = await modelFruit.find().populate("id_distributor");
  try {
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// display list by price ----------------------------------------------------------
router.get("/getListByPrice", async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = { price: { $gte: start, $lte: end } };
    console.log(query);
    const result = await modelFruit
      // truyền điều kiện, và chỉ lấy các trường mong muốn (vd: "name price quantity id_distributor")
      .find(query, "name price quantity id_distributor")
      .populate("id_distributor")
      .sort({ price: -1 }) // giảm dần = -1, tăng dần = 1
      .skip(0) // bỏ qua số lượng row
      .limit(2); // lấy 2 sản phẩm
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// display list user getById ----------------------------------------------------------
router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await modelFruit
      .findById(req.params.id)
      .populate("id_distributor");
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

// update user ----------------------------------------------------------
router.patch("/edit/:id", async (req, res) => {
  try {
    const result = await modelFruit.findByIdAndUpdate(req.params.id, req.body);
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

// delete user ----------------------------------------------------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await modelFruit.findByIdAndDelete(req.params.id);
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
