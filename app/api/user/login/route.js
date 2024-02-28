import connectMongoDB from "@/app/lib/mongodb"
import User from "@/app/models/user"
import { NextResponse } from "next/server";
import bcrypt from bcrypt;
export async function POST(request) {
    try{
    const data = await request.json();
    const {username, password} =  data;
    await connectMongoDB();
    const user = await User.findOne({username});
    if(!user){
        return NextResponse.json({message:"User Does Not Exists"}, {status:404} )
    }
    const encrypt  = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u');
    if(encrypt!==user.password){
        return NextResponse.json({message:"Wrong Password"}, {status: 401})
    }
    return NextResponse.json({user},{status:201});
}
catch(e) {
    return NextResponse.json({msg:`${e}`}, {status:500});
}

} 