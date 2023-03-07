const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let otp;

app.post("/send-otp", (req, res) => {
  const email = req.body.email;
  otp = randomstring.generate({ length: 6, charset: "numeric" });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arunaselvam2000@gmail.com",
      pass: "qfzjagjpzlbmzpex",
    },
  });

  const mailOptions = {
    from: "arunaselvam2000@gmail.com", // Replace with your email address
    to: email,
    subject: "Email verification OTP",
    text: `Your OTP for email verification is ${otp}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to send OTP" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "OTP sent successfully" });
    }
  });
});

app.post("/verify-otp", (req, res) => {
  const receivedOtp = req.body.otp;

  if (receivedOtp === otp) {
    res.status(200).json({ message: "OTP verified successfully", success: true });
  } else {
    res.status(401).json({ message: "OTP verification failed", success: false });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
