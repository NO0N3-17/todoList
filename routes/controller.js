const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const {loginModel} = require('../model/model')
const bcrypt = require('bcrypt')

module.exports.Homepage = async(req, res) => {
  res.render('home')
}


module.exports.loginGet = (req, res) => {
  res.render('login')
}

module.exports.loginPost = async (req, res) => {
  const { username , password } = req.body
  const user = await loginModel.login(username,password)
  const tokenAge = 24 * 60 * 60;
  const id = user._id;
  const token = jwt.sign({ id }, 'ThisisOurProject' ,{ expiresIn: tokenAge });
  res.cookie('jwt', token,{ httpOnly: true,maxAge: tokenAge * 1000 });
  res.redirect("/")

}


module.exports.registerGet= (req,res)=>{
  res.render('register')
}


module.exports.registerPost= async(req,res)=>{
  const { username , cpassword } = req.body
  const salt = await bcrypt.genSaltSync()
  const password = await bcrypt.hashSync(cpassword,salt)
  var todo=[""]
  var date=[]
  await loginModel.create({username,password,todo,date})
  res.redirect("/login")

}


module.exports.logoutGet = (req, res) => {
  res.cookie('jwt','',{ maxage:0 })
  res.redirect("/")
}