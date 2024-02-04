"use client";
import React,{ useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import NavBar from "@/app/components/navbar";
//import { useState } from "react";
import Client from "@/app/components/Client";
import EditorCom from "@/app/components/EditorCom";
const editor= () => {

    const [clients,setClients]=useState([
      { socketId: 1,username: 'Naman'},
      { socketId: 2,username: 'Ansh'},
      { socketId: 3,username: 'unknown'},
    ]);

    // const LeaveButton = () => {
    //   const route=useRouter();
    //   route.push(`/`);
    // };
    return (
      
  <>
      <NavBar/>
      <div className="mainWrap">
       
        <div className="leftSide">
            <div className="leftInner">
                <div className="logo">logo</div>

                <h3>Connected</h3>
                <div className="clientList">

                  {
                    clients.map((client) => (
                    <Client key={client.socketId} username={client.username} />
                    ))
                  }

                </div>
            </div>
          <button className="btn copyBtn">Copy ROOM ID</button>
          <button className=" btn leaveBtn"> <Link href="/">leave here</Link></button>
        </div>
        <div className="EditorWrap">
            <EditorCom />
            
        </div>
    </div>    
  </>
    
   
    );

    return (
        <>
          <h1>First Post</h1>
          <h2>
            <Link href="/"></Link>
          </h2>
        </>
      );
    
}

export default editor;