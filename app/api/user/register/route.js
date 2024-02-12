import connectMongoDB from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, email, password } = request.json();
  console.log(username);
  try {
    // Connect to MongoDB
    await connectMongoDB();
    console.log("Connected to database");
    // Check if the user already exists
    const userCheck = await User.findOne({ username });

    // Placeholder for password encryption (replace with actual encryption logic)
    const encrypt = password;

    // Create a new user instance
    const user = new User({
      username: username,
      email: email,
      password: encrypt,
    });

    // Save the user to the database
    await user.save();

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
