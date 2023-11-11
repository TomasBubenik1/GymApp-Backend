const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");


async function Register(req, res) {
  const { email, name, age, currentWeight, goalWeight, height, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        age,
        currentWeight,
        goalWeight,
        height,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create user" });
  }
}

async function getAllUsers(req, res) {
  try {
    users = await prisma.user.findMany();
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(erorr);
    res.status(400).json({ error: "Unable to get Users" });
  }
}



async function getLoggedinUser(req, res) {
  const sessionId = req.sessionID;

  if(!sessionId){res.status(400).json({message:"You arent logged in"})}
  else{
  const sessiondata = await prisma.session.findUnique({
    where: {sid:sessionId}
  })
  const userId = sessiondata.sess.user.id
  
  const exercisePlans = await prisma.workoutPlan.findMany({
    where: {
      createdById: userId,
    },
    include: {
      exercises: true,
      createdBy: true,
      likedWorkoutPlan: true,
    },
  });

  console.log(userId)
  res.status(200).json({exercisePlans,sessiondata});
}
}


module.exports = {
  Register,
  getAllUsers,
  getLoggedinUser,
};
