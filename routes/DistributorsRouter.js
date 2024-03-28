var express = require("express");
var router = express.Router();
const modelDistributor = require("../models/Distributor");

/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource Distributor test");
});

// add data
router.post("/add", async (req, res) => {
  try {
    const model = new modelDistributor(req.body);
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
  const result = await modelDistributor.find({});
  try {
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// display list user getById
router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await modelDistributor.findById(req.params.id);
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
    const result = await modelDistributor.findByIdAndUpdate(req.params.id, req.body);
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
    const result = await modelDistributor.findByIdAndDelete(req.params.id);
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

router.get("/get-list-distributor", async (req, res) => {
  try {
      const data = await modelDistributor.find().sort({createdAt: -1});
      if(data) {
          res.json({
              "status": 200,
              "messenger": "thành công",
              "data": data
          })
      } else {
          res.json({
              "status": 400,
              "messenger": "Lỗi, không thành công",
              "data": []
          })
      }
  } catch (error) {
     console.log(error) 
  }
})

router.get("/search-distributors",async(req,res)=>{
  try {
      const key = req.query.key;

      const data = await modelDistributor.find({name:{"$regex":key, "$options":"i"}}).sort({createdAt:-1});
      if(data){
          res.json({
              "status":200,
              "messenger":"Thành công",
              "data":data
          })
      }else{
          res.json({
              "status":400,
              "messenger":"Không thành công",
              "data":[]
          })
      }
  } catch (error) {
      console.log(error)
  }
})
router.delete("/delete-distributors/:id", async (req, res) => {
  try {
      const { id } = req.params
      const result = await modelDistributor.findByIdAndDelete(id);
      if (result) {
          res.json({
              "status": 200,
              "messenger": "Xóa thành công",
              "data": result
          })
      } else {
          res.json({
              "status": 400,
              "messenger": "Lỗi, xóa không thành công",
              "data": []
          })
      }
  } catch (error) {
      console.log(error);
  }
})
router.put("/update-distributors/:id", async(req,res)=>{
  try {
      const {id}=req.params;
      const data = req.body;
      const result = await modelDistributor.findByIdAndUpdate(id,{name:data.name});
      if(result){
          res.json({
              "status": 200,
              "messenger": "Sửa thành công",
              "data": result
          })
      }else{
          res.json({
              "status": 400,
              "messenger": "Lỗi, sửa không thành công",
              "data": []
          })
      }
  } catch (error) {
      console.log(error);
  }
})
module.exports = router;
