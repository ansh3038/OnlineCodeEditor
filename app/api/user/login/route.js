import connectMongoDB from "@/app/lib/mongodb"
import User from "@/app/models/user"
import { NextResponse } from "next/server";
export async function POST(request) {
    const {username, password} = request;
    await connectMongoDB();
    const user = User.findOne({username});

    if(!user){
        return NextResponse({message:"User Does Not Exists"}, {status:404} )
    }
    const encrypt  = password;
    if(encrypt!==password){
        return NextResponse({message:"Wrong Password"}, {status: 401})
    }
    return NextResponse({user},{status:201});

} 