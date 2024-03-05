"use client";
import { redirect, useParams, useRouter } from "next/navigation";
import EditorCom from "@/app/components/EditorCom";
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { initSocket } from "@/app/components/socket/config";
import ACTIONS from "@/app/actions";
import Client from "@/app/components/Client";
import Link from "next/link";


function Editor() {
  const socketRef = useRef(initSocket);
  const parentEditorRef = useRef(null);
  const codeRef = useRef("Text here");
  const { id } = useParams();
  const [clients, setClients] = useState([]);
  const { data: session } = useSession();
  const [socketId, setSocketId] = useState(initSocket.id);
  const roomId = id[0];
  const route=useRouter();
  useEffect(() => {
    const init = () => {
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
      
      socketRef.current.on("socketID", (socket) => {
        setSocketId(socket);
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if(username.name!==session.user?.name){
            console.log(username.name);
            toast.success(`${username?.name} joined the room.`);
            }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, username }) => {
          console.log(username);
          toast.success(`${username?.name} have  left the room.`);
          setClients((prev) => {
            return prev.filter(
              (client) => client.socketId !== socketId
              );
            });
          }
          );
          // socketRef.current.on("hellohello", ({ code }) => {});
        };
        init();
        return () =>{
          
        }
      }, [socketRef.current]);
      
      useEffect(()=>{
        
        return () =>{
          socketRef.current.emit("befDisconnect",{roomId});
          console.log("event triggered");
        
       //socketRef.current.disconnect();
    }
  },[])

  //Checking whether user signed in or not
  if (!session || !session?.user) {
    redirect("/api/auth/signin");
  }

  const setEditorRefToParent = (editorRef) => {
    parentEditorRef.current = editorRef;
  };

  const saveCode = async () => {
    console.log("save function called");
    console.log(session.user?.name);
    try {
      const username = session?.user?.name;
      const code = codeRef.current;
      console.log("code ", code);
      const response = await fetch("/api/code/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          code,
        }),
      });
      if (response.ok) {
      }
    } catch (error) {}
  };

  const loadCode = async () => {
    console.log("load function called");
    const username = session.user?.name;
    try {
      const response = await fetch(`/api/code/load`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      });

      if (response) {
        const { code } = await response.json();
        codeRef.current = code;
        if (parentEditorRef.current) {
          parentEditorRef.current.setValue(code);
        }
        // setCode(code);
      }
    } catch (e) {
      console.log("Error loading code:", e);
    }
  };
  async function copyRoomId() {
    try {
        await navigator.clipboard.writeText(id);
        toast.success('Room ID has been copied to your clipboard');
        console.log("copied");
    } catch (err) {
        toast.error('Could not copy the Room ID');
        console.error(err);
    }
}
  function leave(){
    console.log("leave");

    socketRef.current.emit("befDisconnect",{roomId});
    route.push('/');

  }

  return (
    <>
      <div className="mainWrap">
        <div className="leftSide">
          <div className="leftInner">
            <h3>Connected</h3>
            <div className="clientList max-h-[83vh] overflow-y-auto">
              {clients.map((client) => (
                <Client key={client.socketId} username={client?.username?.name} />
                ))}
            </div>
          </div>
                <button className="btn copyBtn" onClick={()=>copyRoomId()}>Copy ROOM ID</button>
              
                  <button className="btn leaveBtn" onClick={()=> leave()}>Go Back</button>
              
        </div>
        <div className="EditorWrap h-screen">
          <div className="Language-Theme d-flex  justify-content-between mb-1 mt-1">
            <div className="LanguageSelect w-25 ">
              <label className="visually-hidden" htmlFor="Lang_Option">
                Preference
              </label>
              <select className="form-select" id="Lang_Option">
                <option value="Java">Java</option>
                <option value="Cpp">Cpp</option>
                <option value="C">C</option>
                <option value="Python">Python</option>
              </select>
            </div>

            <div className="ThemeSelect w-25 ">
              <label className="visually-hidden" htmlFor="Theme">
                Preference
              </label>
              <select className="form-select" id="Theme">
                <option value="dracula.css">Dracula</option>
                <option value="3024-day.css">Daymode</option>
                <option value="midnight.css">Midnight</option>
                <option value="elegant.css">Elegant</option>
              </select>
            </div>
            <div className="d-grid gap-4 d-md-block">
              <button
                className="btn btn-primary mr-4"
                type="button"
                onClick={() => saveCode()}
              >
                Save
              </button>
              <button
                className="btn btn-primary  mr-4"
                type="button"
                onClick={() => loadCode()}
              >
                Load
              </button>
            </div>
          </div>
          <EditorCom
            roomId={id[0]}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
            socketId={socketId}
            setEditorRefToParent={setEditorRefToParent}
          />
        </div>
      </div>
    </>
  );
}

export default Editor;

function setCode(code) {
  throw new Error("Function not implemented.");
}

