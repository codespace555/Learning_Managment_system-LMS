import nodemailer from "nodemailer";

const sendEmail = async function (email, subject, message) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host:import.meta.env.VITE_SMTP_HOST,
    port: import.meta.env.VITE_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: import.meta.env.VITE_SMTP_USERNAME,
      pass: import.meta.env.VITE_SMTP_PASSWORD,
    },
});
 
let mailOptions = {
  from: import.meta.env.VITE_SMTP_FROM_EMAIL,
  to: email,
  subject: subject,
  html: message
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      console.log('Error occurred:', error);
  } else {
      console.log('Email sent:', info.response);
  }
});
};

export default sendEmail;
