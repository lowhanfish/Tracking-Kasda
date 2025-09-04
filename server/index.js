import express from "express";
import 'dotenv/config';

import db from "./db/mysql/index.js";
import auth from "./auth/index.js";
import {isLoggedIn} from "./auth/midlewares.js";

const app = express();
const port = 3000;
const router = express.Router();
app.use(router);

app.use(express.json());

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


// =============== END YOUR API ==================




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.post('/login', (req, res)=>{
  res("activate end-point login auth")
})
