const mongoose = require("mongoose");
const User = require("./models/user");

mongoose.connect("mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.88fpyvj.mongodb.net/?appName=Cluster0")
  .then(async () => {
    console.log("✅ MongoDB connected");

    const users = await User.find({});
    for (let user of users) {
      if (user.balance === undefined) user.balance = 0;
      if (user.createdAt === undefined) user.createdAt = new Date();
      if (user.isPremium === undefined) user.isPremium = false;
      if (user.role === undefined) user.role = "user";
      await user.save();
    }

    console.log("✅ All old users updated");
    mongoose.connection.close();
  })
  .catch(err => console.error("❌ MongoDB error:", err));
