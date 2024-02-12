"use client";
import { redirect, useParams, useRouter } from "next/navigation";
import EditorCom from "@/app/components/EditorCom";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { initSocket } from "@/app/components/socket/config";
import ACTIONS from "@/app/actions";
import Client from "@/app/components/Client";

function editor() {
  const socketRef = useRef(initSocket);
  const codeRef = useRef(null);
  const { id } = useParams();
  const [clients, setClients] = useState([]);
  const { data: session } = useSession();
  const [socketId, setSocketId] = useState(initSocket.id);
  // console.log(id[0]);
  useEffect(() => {
    const init =() => {
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      function handleError(e) {
        redirect("/");
      }
      const roomId = id[0];
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: session?.user,
      });

      socketRef.current.on("socketID", (socket)=>{
        setSocketId(socket);
      })

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );
      socketRef.current.on(
        "hellohello",
        ({ code }) => {
        }
      );
    };
    init();
    return () => {
      // socketRef.current.disconnect();
      // socketRef.current.off(ACTIONS.JOINED);
      // socketRef.current.off(ACTIONS.DISCONNECTED);
    }
  }, []);

  //Checking whether user signed in or not
  if (!session || !session?.user) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <div className="mainWrap">
        <div className="leftSide">
          <div className="leftInner">
            <h3>Connected</h3>
            <div className="clientList">
              {clients.map((client : {socketId:any, username:any}) => (
                <Client key={client.socketId} username={client.username.name} />
              ))}
            </div>
          </div>
          <button className="btn copyBtn">Copy ROOM ID</button>
          <a href="/">
            <button className="btn leaveBtn">Go Back</button>
          </a>
        </div>
        <div className="EditorWrap h-screen">
          <EditorCom
            roomId={id[0]}
            onCodeChange={(code:any) => {
              codeRef.current = code;
            }}
            socketId = {socketId}
          />
        </div>
      </div>
    </>
  );
}

export default editor;
