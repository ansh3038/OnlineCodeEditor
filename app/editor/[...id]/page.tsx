import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function EditorPage(){
    const session = await getServerSession();
    if(!session || !session.user){
        redirect("/api/auth/signin");
    }
    return (<>
        Hello World
    </>)
}