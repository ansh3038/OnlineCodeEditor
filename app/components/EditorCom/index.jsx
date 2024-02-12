import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/mode/clike/clike";
import ACTIONS from "@/app/actions";
import { initSocket } from "../socket/config";

const EditorCom = ({ roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const initSocketRef = useRef(initSocket);

  useEffect(() => {
    function init() {
      const textarea = document.getElementById("realtimeEditor");
      editorRef.current = Codemirror.fromTextArea(textarea, {
        mode: "text/x-java", // Use 'name' property instead of 'name'
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        indentWithTabs: true,
      });
      editorRef.current.setSize("100%", "100%");

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          initSocketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
    const socket = initSocketRef.current;

    socket.on(ACTIONS.CODE_CHANGE, ({ code }) => {
      if (code !== null) {
        editorRef.current.setValue(code);
      }
    });

  }, [initSocketRef.current]); 

  
  // useEffect(() => {
    

  //   return () => {
  //     // Cleanup logic, if needed
  //     // socket.off(ACTIONS.CODE_CHANGE);
  //   };
  // }, [initSocketRef.current]); 

 
  return (
    // Using defaultValue prop for the initial value of textarea
    <textarea id="realtimeEditor" defaultValue="text here"/>
  );
};

export default EditorCom;
