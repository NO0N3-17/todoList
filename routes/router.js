const { Router }= require('express')
const router = Router()
const controller = require('./controller')
const { loginModel } = require('../model/model');
const { requireAuth, checkUser, returnUser} = require('../middlewares/authMiddlewares')
const jwt= require('jsonwebtoken')

router.get('/',[ checkUser ],controller.Homepage);


router.get('/login',controller.loginGet);


router.post('/login',controller.loginPost);


router.get('/register',controller.registerGet);


router.post('/register',controller.registerPost);


router.post('/add',async(req ,res)=>{
    const token = req.cookies.jwt;
    const { newtodo , date } = req.body
    let nowDate = new Date().toJSON().slice(0,10).replace(/-/g,'-')
    console.log(date)
    console.log(nowDate)
    jwt.verify(token, 'ThisisOurProject', async (err, decodedToken) => {
        if (err) {
          return null;
        } else {
          const user = await loginModel.findById(decodedToken.id);
          user.toDoList.push(newtodo);
          user.endDate.push(date)
          await user.save();
        }
      });
    res.redirect('/')
});

router.post('/remove',async(req ,res)=>{
    const { index } = req.body
    const token = req.cookies.jwt;
    jwt.verify(token, 'ThisisOurProject', async (err, decodedToken) => {
        if (err) {
          return null;
        } else {
          const user = await loginModel.findById(decodedToken.id);
          user.toDoList.splice(index,1);
          await user.save();
        }
      });
    res.redirect('/')

});


router.get('/logout',controller.logoutGet);


module.exports = router;