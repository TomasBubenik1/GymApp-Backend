const prisma = require("../lib/prisma");
const bcrypt = require('bcrypt');
const cookiesMiddleware = require('universal-cookie-express');


async function Login(req, res) {
  try {
      const { email, password } = req.body;

      if (!email) {
          return res.status(400).json({ error: 'Email is required.' });
      }

      if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }

      const user = await prisma.user.findUnique({
          where: { email },
      });

      if (!user) {
          return res.status(400).json({ error: 'User with this email address was not found.' });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ error: 'Password is not valid' });
    }

      if (validPassword) {
        
          req.session.user = user;
          req.session.isAuth = true
          
          res.status(200).json({message:"You have been sucesfully logged in!"});
      } else {
          return res.status(401).json({error:'Email or password is incorrect.'});
      }
  } catch (error) {
      console.error('Error in Login: ', error);
      res.status(500).json({message: 'Internal server error' });
  }
}


  

async function Logout(req,res){
  req.session.destroy((err)=>{
    if(err){
      res.status(500).json({message:"Failed to logout."})
    }
    res.clearCookie('connect.sid');
    res.status(200).json({message:"Logged out sucessfuly."})
  })
}

module.exports = {
Login,
Logout
};