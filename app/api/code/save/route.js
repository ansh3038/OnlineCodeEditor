import connectMongoDB from "@/app/lib/mongodb"
import Code from "@/app/models/code"
import { NextResponse } from "next/server";

export async function POST(request){
    try{
        console.log(" inside api/code/save")
        const data = await request.json();
        const {username,code} = data;
        await connectMongoDB(); 
        const user = await Code.findOne({username:username});
        console.log(username, " ",code)
        console.log("if user found ",user);
        if(user){
            console.log("inside user if");
            await Code.deleteOne({username:username});
            console.log("previous code deleted");
        }
        const codeCreate = new Code({username:username,code:code});
        await codeCreate.save();
        console.log("code saved");
        return NextResponse.json({ msg:"code saved succesfully", user }, { status: 201 },);

    }
    catch(e){
        console.log(e);
        return NextResponse.json({msg:"Internal Server error"}, {status:500});

    }
}
// export async function GET(request){
//         try {
//             const data = await request.json();
//             console.log("request ", data);
//             const username = "";
//             console.log(username);
//             await connectMongoDB();
//             const codeCheck = await Code.findOne({username});
//             if(!codeCheck){
//                 return NextResponse.json({msg:"Code Not found"}, {status:404});
//             }
//             return NextResponse.json({code:codeCheck.code,msg:"Code found"},{status:201});
            
//         } catch (error) {
//             console.log("GET ERROR")
//             console.log(error);
//             return NextResponse.json({msg:"Internal Server error"}, {status:500});
            
//         }
// }