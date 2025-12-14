import express from "express";
import 'dotenv/config';

import db from "./db/mysql/index.js";
import auth from "./auth/index.js";
import {isLoggedIn, checkTokenAndSetUser} from "./auth/midlewares.js";
import cors from "cors";

const app = express();
const port = 3000;
const router = express.Router();


// import { sendEmail } from "./lib/sendEmail.js";
// sendEmail('kikensbatara@gmail.com', 'coba email', 'ini adalah email text')

app.use(router);
app.use(cors({
  // origin : 'http://localhost:8081'
  origin : '*'
}))
app.use(express.json());
app.use(checkTokenAndSetUser);

router.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨Hello gezz,,, Anda mengunjugi alamat yg salah... cari apa sih !? 🌈✨🦄',
    user : req.user
  });
});

// =============== START YOUR API ==================

    app.use('/auth', auth)

    import checkAuth from "./api/checkAuth.js";
    app.use('/api/checkAuth', isLoggedIn, checkAuth)
    
    import menu from "./api/menu.js";
    app.use('/api/menu', isLoggedIn, menu)
    import group from "./api/group.js";
    app.use('/api/group', isLoggedIn, group)
    import user from "./api/user.js";
    app.use('/api/user', isLoggedIn, user)


    import unitKerja from "./api/master/unitKerja.js";
    app.use('/api/unitKerja', isLoggedIn, unitKerja)
    import masterTahapan from "./api/master/masterTahapan.js";
    app.use('/api/masterTahapan', isLoggedIn, masterTahapan)
    import masterJnsPencairan from "./api/master/masterJnsPencairan.js";
    app.use('/api/masterJnsPencairan', isLoggedIn, masterJnsPencairan)
    import masterPPH from "./api/master/masterPPH.js";
    app.use('/api/masterPPH', isLoggedIn, masterPPH)
    import masterPPN from "./api/master/masterPPN.js";
    app.use('/api/masterPPN', isLoggedIn, masterPPN)

    import document from "./api/document.js";
    app.use('/api/document', isLoggedIn, document)

// =============== END YOUR API ==================


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.post('/login', (req, res)=>{
  res("activate end-point login auth")
})
