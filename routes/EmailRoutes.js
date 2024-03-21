var express = require("express");
var router = express.Router();
const transporter = require("../config/Email");


/* GET users listing. */
router.post("/test", function (req, res, next) {
  const mailOption = {
    from: "lexuanthao.tk7@gmail.com",
    to: "nin.tk100@gmail.com",
    subject: "test mail",
    text: "this is a test email sent Nodejs project"
  }
  transporter.sendMail(mailOption, function(error, info){
    if (error) {
      res.status(500).json({error: "send mail fail"+ error})
    }else{
      res.status(200).json({message: "send mail success"+ info.response})
    }
  })
});


module.exports = router;
