"use client";
import { redirect, useParams, useRouter } from "next/navigation";
import EditorCom from "@/app/components/EditorCom";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { initSocket } from "@/app/components/socket/config";
import ACTIONS from "@/app/actions";
import Client from "@/app/components/Client";

function Editor() {
  const socketRef = useRef(initSocket);
  const codeRef = useRef("Text here");
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
  }, [socketRef.current]);

  //Checking whether user signed in or not
  if (!session || !session?.user) {
    redirect("/api/auth/signin");
  }

  const saveCode = async () => {
      console.log("save function called");
      console.log(session.user?.name);
      try {
        const username = session?.user?.name;
        const code = codeRef.current;
        console.log("code ", code);
        const response = await fetch('/api/code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            code
          }),
        });
        if(response.ok){

        }
      } catch (error) {
        
      }
  }

  const loadCode = async () => {
    console.log("load function called");
    const username = session.user?.name;
    try {
        const response = await fetch(`/api/code?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log("inside response if");
            const { code } = await response.json();
            codeRef.current = code;
        }
    } catch (e) {
        console.error("Error loading code:", e);
    }
}


  return (
    <>
      <div className="mainWrap">
        <div className="leftSide">
          <div className="leftInner">
            <h3>Connected</h3>
            <div className="clientList max-h-[83vh] overflow-y-auto" >
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

            <div className="Language-Theme d-flex  justify-content-between mb-1 mt-1" >
                <div className="LanguageSelect w-25 ">
                    <label className="visually-hidden" htmlFor="Lang_Option">Preference</label>
                    <select className="form-select" id="Lang_Option">
                                
                                <option value="Java">Java</option>
                                <option value="Cpp">Cpp</option>
                                <option value="C">C</option>
                                <option value="Python">Python</option>
                    </select>
                </div>


                <div className="ThemeSelect w-25 ">
                    <label className="visually-hidden" htmlFor="Theme">Preference</label>
                    <select className="form-select" id="Theme">
                              
                                <option value="dracula.css">Dracula</option>
                                <option value="3024-day.css">Daymode</option>
                                <option value="midnight.css">Midnight</option>
                                <option value="elegant.css">Elegant</option>
                    </select>
                </div>
                <div className="d-grid gap-4 d-md-block">
                    <button className="btn btn-primary mr-4" type="button" onClick={() => saveCode()}>Save</button>
                    <button className="btn btn-primary  mr-4" type="button" onClick={() => loadCode()}>Load</button>
                </div>
            </div>
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

export default Editor;
