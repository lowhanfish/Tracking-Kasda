
import nodemailer from 'nodemailer'


import db from '../db/mysql/index.js'

const main = process.env.DB_MAIN;
const simpeg = process.env.DB_SIMPEG;
const egov = process.env.DB_USER;





export const sendEmail = async (to, subject, text)=>{

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
    to: to,
    subject: subject,
    text: text,
};


   try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email terkirim:", info.response);
  } catch (err) {
    console.error(err);
  }

}
export const sendEmailHtml = async (to, subject, text)=>{

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
    to: to,
    subject: subject,
    html: text,
};


   try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email terkirim:", info.response);
  } catch (err) {
    console.error(err);
  }

}

export const sendEmailByDocId = async (documents_id, judul, status_text, full_text)=> {


        
        const query = `
          SELECT

          documents.id,
          documents.uraian,
          biodata.email as email,
          biodata.nama as nama

          FROM ${main}.documents documents

          LEFT JOIN ${egov}.users users
          ON users.id = documents.createdBy

          LEFT JOIN ${simpeg}.biodata biodata
          ON users.nama_nip = biodata.nip

          WHERE documents.id = ?
        `;
    
        const values = [documents_id];
    
        db.query(query, values, async (err, rows)=>{
          if (err) {
            console.log(err)
          } else {

            const to = rows[0].email;
            const subject = judul;
            const text = `
              <h2>Hello ${rows[0].nama} 👋</h2>
              <p>Pengajuan anda terkait "<b>${rows[0].uraian}</b>" ${status_text}</p>
              
              <div>${full_text}</div>
              <div>Untuk lebih lengkapnya silahkan buka aplikasi e-tracking anda pada alamat https://e-tracking.konaweselatankab.go.id/TrackingDokumen</div>
              <br/>
              
              <div><i>Mohon untuk tidak membalas pesan otomatis ini...</i></div>
              <div><b>Hormat Kami, BKAD KAB. KONAWE SELATAN 🙏</b></div>
            `


            sendEmailHtml(to, subject, text)
          }
          
        })
 




}


export const sendEmailByDocIdNIP = async (documents_id, judul, status_text, full_text)=> {


        
        const query = `
          SELECT

          documents.id,
          documents.uraian,
          biodata.email as email,
          biodata.nama as nama

          FROM ${main}.documents documents

          LEFT JOIN ${simpeg}.biodata biodata
          ON documents.pengusul = biodata.nip

          WHERE documents.id = ?
        `;
    
        const values = [documents_id];
    
        db.query(query, values, async (err, rows)=>{
          if (err) {
            console.log(err)
          } else {

            const to = rows[0].email;
            const subject = judul;
            const text = `
              <h2>Hello ${rows[0].nama} 👋</h2>
              <p>Pengajuan anda terkait "<b>${rows[0].uraian}</b>" ${status_text}</p>
              
              <div>${full_text}</div>
              <div>Untuk lebih lengkapnya silahkan buka aplikasi e-tracking anda pada alamat https://e-tracking.konaweselatankab.go.id/TrackingDokumen</div>
              <br/>
              
              <div><i>Mohon untuk tidak membalas pesan otomatis ini...</i></div>
              <div><b>Hormat Kami, BKAD KAB. KONAWE SELATAN 🙏</b></div>
            `


            sendEmailHtml(to, subject, text)
          }
          
        })
 




}








