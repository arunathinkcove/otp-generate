const nodemailer = require("nodemailer");
const redis = require("redis");

const redisClient = redis.createClient();

const sendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  redisClient.setex(email, 300, otp);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "arunaselvam2000@gmail.com",
        pass: "qfzjagjpzlbmzpex",
    },
  });

  const mailOptions = {
    from: "arunaselvam2000@gmail.com",
    to: email,
    subject: "OTP for Login",
    text: `Your OTP for Login is ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const verifyOTP = (email, otp, callback) => {
  redisClient.get(email, (err, data) => {
    if (err) {
      callback(false);
    } else if (data !== otp) {
      callback(false);
    } else {
      redisClient.del(email, (err) => {
        if (err) {
          callback(false);
        } else {
          callback(true);
        }
      });
    }
  });
};

module.exports = {
  sendOTP,
  verifyOTP,
};
