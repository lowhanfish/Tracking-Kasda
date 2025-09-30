
import nodemailer from 'nodemailer'







export const sendEmail = async ()=>{

    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL,   // ganti dengan emailmu
        pass:process.env.EMAIL_PASS,      // gunakan App Password
    },
});

// Opsi email
const mailOptions = {
    // from: 'kikensbatara@gmail.com',
    from: process.env.EMAIL,
    to: "kikensbatara@gmail.com",
    subject: "Hello dari Node.js (ESM)",
    text: "Ini email dengan Node.js pakai import!",
};


   try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email terkirim:", info.response);
  } catch (err) {
    console.error(err);
  }

}








