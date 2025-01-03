const mongoose = require("mongoose");
const User = require('./models/userModel'); // Update with the correct path to your user model

// MongoDB connection URL (update with your MongoDB connection string)
const mongoURI = "mongodb+srv://kuleswariexpertsolutions:w5F2FkJHr8TKnOyU@cluster0.unm3o.mongodb.net/ecomtest"; // Replace with your DB name

// Seed function to add an admin and a user
const seedUsers = async () => {
  try {
    // Connect to the database
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");

    // Check if users already exist
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    const existingUser = await User.findOne({ email: "user@example.com" });

    if (existingAdmin || existingUser) {
      console.log("Admin or User already exists in the database. Skipping seed.");
    } else {
      // Create admin user
      const admin = new User({
        firstname: "Admin",
        lastname: "User",
        email: "admin@example.com",
        mobile: "1234567890",
        password: "Admin123!", // Plain-text password
        role: "admin",
      });

      // Create regular user
      const user = new User({
        firstname: "Regular",
        lastname: "User",
        email: "user@example.com",
        mobile: "9876543210",
        password: "User123!", // Plain-text password
        role: "user",
      });

      // Save both users to the database
      await admin.save();
      await user.save();

      console.log("Admin and User created successfully");
    }
  } catch (error) {
    console.error("Error seeding users:", error.message);
  } finally {
    // Disconnect from the database
    mongoose.connection.close();
  }
};

// Run the seed function
seedUsers();
