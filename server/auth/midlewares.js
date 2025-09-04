
import jwt from "jsonwebtoken";
import db from "../db/mysql/index";


function checkTokenSeetUser(req, res, next){
     const authHeader = req.get('authorization');
     if (authHeader) {
          const token = authHeader.split(' ')[1];
          if (token) {
               jwt.verify(token, process.env.TOKEN_SECRET, function(error, user) {
                    if (error) {
                         console.log(error);
                    }
                    req.user = user;
                    next()
               });
          }else{
               next();
          }
     }else{
          next();
     }
}

function isLoggedIn(req, res, next){
     if (req.user) {
          next();
     }else {
          const error = new Error('SILAHKAN LOGIN DULU..!!!');
          res.status(401);
          next(error);
     }
}

function sideMenuMidleware(req, res, next){
     console.log(req.body);

     var profile = req.user.profile


          // req.menu = 'SOOOOIMAAAH INI REQ MENUUUU'


          var query = `
               SELECT 
               menu_klp_list.*,
               menu.route
               FROM menu_klp_list
               JOIN menu
               ON menu_klp_list.menu_id = menu.id

               WHERE menu_klp_list.menu_klp_id = `+parseInt(profile.absensi)+`

          `;



          db_absensi.query(query, (err, rows) => {
               if (err) {
                    console.log(err);
               } else {
                    req.menu_akses = rows
                    next();

               }
          })



          // console.log(profile.absensi);
}

export {checkTokenSeetUser, isLoggedIn, sideMenuMidleware}