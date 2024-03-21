const nodemailer = require("nodemailer");

// Tạo một đối tượng transporter
const transporter = nodemailer.createTransport({
    service: "gmail", // Sử dụng dịch vụ Gmail
    auth:{
        user: "lexuanthao.tk7@gmail.com", // Địa chỉ email của bạn
        pass: "vmpi tmka cyvy obwp" // Mật khẩu của bạn
    }
})

module.exports = transporter;
