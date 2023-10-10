const prisma = require("../lib/prisma");

async function createUser(req, res) {
  const { email, name, age, currentWeight, goalWeight, height, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        age,
        currentWeight,
        goalWeight,
        height,
        password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create user" });
  }
}

async function getAllUsers(req,res){
  
  try{users = await prisma.user.findMany()
return res.status(200).json({data:users})
}catch(error){
  console.log(erorr)
  res.status(400).json({error:"Unable to get Users"})}
}
  


module.exports = {
  createUser,
  getAllUsers,
};
