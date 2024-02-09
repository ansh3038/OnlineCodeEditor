import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default function checkUser(){
    const session =  getServerSession();
    if(!session || !session?.user){
        redirect("/api/auth/signin");
    }
  }