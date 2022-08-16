const bcrypt = require('bcrypt');
const { loginModel , adminModel } = require('../model/model');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');


// verify the web token to allow them to their site
const requireAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'ThisisOurProject' , (err,decodedToken) => {
            if(err){
                console.log("error");
                res.redirect('/login')
            }else{
                next();
            }
        })
    }else{
        res.redirect('/login')
    }

}



//checking User
const checkUser = async(req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'ThisisOurProject', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          res.locals.todolist = null;
          res.locals.date = null;
          next();
        } else {
          let user = await loginModel.findById(decodedToken.id);
          res.locals.user = user;
          res.locals.todolist = user.toDoList;
          res.locals.date = user.endDate;
          
          next();
        }
      });
    } else {
      res.locals.user = null;
      res.locals.todolist = null;
      res.locals.date = null;
      // next();
      // res.redirect('/login');
      next();
    }
  }

  const  returnUser = async(req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'ThisisOurProject', async (err, decodedToken) => {
        if (err) {
          return null;
        } else {
          let user = await loginModel.findById(decodedToken.id);
          return user;
        }
      });
    } else {
      return null;
      // next();
      // res.redirect('/login');
    }
  }


module.exports = { requireAuth , checkUser, returnUser }


