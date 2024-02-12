"use client";
import { redirect, useParams, useRouter } from "next/navigation";
import EditorCom from "@/app/components/EditorCom";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { initSocket } from "@/app/components/socket/config";
import ACTIONS from "@/app/actions";
import Client from "@/app/components/Client";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage.external";

function editor() {
  const socketRef = initSocket;
  const codeRef = useRef(null);
  const { id } = useParams();
  const [clients, setClients] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const init =() => {
      socketRef.on("connect_error", (err) => handleError(err));
      socketRef.on("connect_failed", (err) => handleError(err));

      function handleError(e) {
        console.log(e);
        redirect("/");
      }

      socketRef.emit(ACTIONS.JOIN, {
        id,
        username: session?.user,
      });

      socketRef.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {

          setClients(clients);
          socketRef.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );
    };
    init();
    return () => {
      // socketRef.disconnect();
      // socketRef.off(ACTIONS.JOINED);
      // socketRef.off(ACTIONS.DISCONNECTED);
    }
  }, []);

  //Checking whether user signed in or not
  if (!session || !session?.user) {
    redirect("/api/auth/signin");
  }
  console.log(id[0]);

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
          />
        </div>
      </div>
    </>
  );
}

export default editor;
