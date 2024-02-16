import connectMongoDB from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
  const {username, email,password} = await request.json();
  console.log(username);
    // Connect to MongoDB
    await connectMongoDB();
    console.log("Connected to database");
    // Check if the user already exists
    const userCheck = await User.findOne({ username });
    if(userCheck){
      return NextResponse.json({ msg:"user found", user:username }, { status: 203 },);

    }
    // // Placeholder for password encryption (replace with actual encryption logic)
    const encrypt = password;

    // // Create a new user instance
    const user = new User({
      username: username,
      email: email,
      password: encrypt,
    });

    // // Save the user to the database
    await user.save();

    return NextResponse.json({ msg:"user", user:username }, { status: 201 },);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
