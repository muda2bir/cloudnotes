const mongoose = require(`mongoose`);

const connectToDatabase = async () => {
  const DB = process.env.DATABASE;
  try {
    await mongoose.connect(DB);
    console.log(`Connected to Database Successfully!!`);
  } catch (error) {
    console.log("Error: " + error);
  }
};

connectToDatabase();
