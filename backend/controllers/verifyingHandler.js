import crypto from "crypto";
import nodemailer from "nodemailer";

async function sendVerificationEmail(user, verificationToken, req) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: user.email,
    subject: "Verify Your Email",
    html: `<h4>Hello, ${user.first_name}</h4>
           <p>Please verify your email by clicking on the link below:</p>
           <a href="http://${req.headers.host}/verify-email?token=${verificationToken}">Verify Email</a>`,
  };
  await transporter.sendMail(mailOptions);
}

function generateVerificationToken(size = 32) {
  return crypto.randomBytes(size).toString("hex");
}

export { sendVerificationEmail, generateVerificationToken };
