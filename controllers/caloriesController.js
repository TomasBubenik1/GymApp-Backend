const prisma = require("../lib/prisma");

async function modifyCalorieIntake(req, res) {
  const { date, goalCalories, consumedCalories } = req.body;
  const userId = req.session.user.id;

  try {
    const dateObj = new Date(date);

    let dailyRecord = await prisma.dailyCalorieIntake.findFirst({
      where: {
        userId: userId,
        date: dateObj,
      },
    });
    let dailyHistory = await prisma.calorieIntakeHistory.findFirst({
      where: {
        userId: userId,
        date: dateObj,
      },
    });

    if (dailyRecord) {
      dailyRecord = await prisma.dailyCalorieIntake.update({
        where: { id: dailyRecord.id },
        data: {
          goalCalories: goalCalories,
          consumedCalories: consumedCalories,
        },
      });
    } else {
      dailyRecord = await prisma.dailyCalorieIntake.create({
        data: {
          userId: userId,
          date: dateObj,
          goalCalories: goalCalories,
          consumedCalories: consumedCalories,
        },
      });
    }
    if (!dailyHistory) {
      dailyHistory = await prisma.calorieIntakeHistory.create({
        data: {
          userId: userId,
          date: dateObj,
          goalCalories: dailyRecord.goalCalories,
          consumedCalories: dailyRecord.consumedCalories,
        },
      });
    }
    dailyHistory = await prisma.calorieIntakeHistory.update({
      where: { id: dailyHistory.id },
      data: {
        userId: userId,
        date: dateObj,
        goalCalories: dailyRecord.goalCalories,
        consumedCalories: dailyRecord.consumedCalories,
      },
    });

    return res.status(200).json({ dailyRecord, dailyHistory });
  } catch (error) {
    console.error("Failed to modify calorie intake:", error);
    return res.status(500).send("Internal Server Error");
  }
}

async function getCalorieIntakeHistory(req, res) {
  const { date } = req.body;
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(400).json({ message: "You arent logged in" });
  }
  try {
    const dateObj = new Date(date);
    const calorieHistory = await prisma.calorieIntakeHistory.findMany({
      where: {
        userId: userId,
      },
    });

    if (calorieHistory) {
      return res.status(200).json(calorieHistory);
    } else {
      return res.status(200).json({
        message: "No record found.",
        newdailyRecord,
      });
    }
  } catch (error) {
    console.error("Failed to retrieve calorie intake:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function getCalorieIntake(req, res) {
  const { date } = req.body;
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(400).json({ message: "You arent logged in" });
  }
  try {
    const dateObj = new Date(date);
    const dailyRecord = await prisma.dailyCalorieIntake.findFirst({
      where: {
        userId: userId,
        date: dateObj,
      },
    });

    if (dailyRecord) {
      res.json(dailyRecord);
    } else {
      const newdailyRecord = await prisma.dailyCalorieIntake.create({
        data: {
          userId: userId,
          date: dateObj,
        },
      });

      res.status(200).json({
        message: "No record found so we created new one",
        newdailyRecord,
      });
    }
  } catch (error) {
    console.error("Failed to retrieve calorie intake:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  modifyCalorieIntake,
  getCalorieIntake,
  getCalorieIntakeHistory,
};
