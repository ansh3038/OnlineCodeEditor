"use client";
import { redirect, useParams, useRouter } from "next/navigation";
import EditorCom from "@/app/components/EditorCom";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { initSocket } from "@/app/components/socket/config";
import ACTIONS from "@/app/actions";
import Client from "@/app/components/Client";

function editor() {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const { id } = useParams();
  const [clients, setClients] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      function handleError(e) {
        console.log(e);
        redirect("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        id,
        username: session?.user,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username != session.user) {
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );
    };
    init();
  }, []);
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
              {clients.map((client) => (
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
            socketRef={socketRef}
            roomId={id}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>
    </>
  );
}

export default editor;
