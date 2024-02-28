import connectMongoDB from "@/app/lib/mongodb"
import Code from "@/app/models/code"
import { Console } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request){
    try{
        console.log(" inside api/code/load")
        const data = await request.json();
        const {username} = data;
        console.log(username);
        await connectMongoDB();
        const codeCheck = await Code.findOne({username});
        if(!codeCheck){
            return NextResponse.json({msg:"Code Not found"}, {status:404});
        }
        console.log("code found", codeCheck.code);
        return NextResponse.json({code:codeCheck.code,msg:"Code found"},{status:201});
        
    } catch (error) {
        console.log("GET ERROR")
        console.log(error);
        return NextResponse.json({msg:"Internal Server error"}, {status:500});
        
    }
}
