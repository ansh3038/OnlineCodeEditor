import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/theme/3024-day.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/midnight.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/mode/clike/clike";

import ACTIONS from "@/app/actions";
import { initSocket } from "../socket/config";

const EditorCom = ({ roomId, onCodeChange, socketId }) => {

  const editorRef = useRef(null);
  const initSocketRef = useRef(initSocket);
  // console.log("socket id ",socketId)

  useEffect(() => {
    
    function init() {
      const textarea = document.getElementById("realtimeEditor");
      editorRef.current = Codemirror.fromTextArea(textarea, {
        mode: "text/x-java",
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        indentWithTabs: true,
      });
      editorRef.current.setSize("100%", "100%");
      var option=document.getElementById("Lang_Option");
      console.log(option.value);

      option.addEventListener("change",function(){
        if(option.value=="Java"){
          editorRef.current.setOption("mode","text/x-Java");
        }
        else if(option.value=="C"){
          editorRef.current.setOption("mode","text/x-csrc");
        }
        else if(option.value=="Cpp"){
          editorRef.current.setOption("mode","text/x-c++src");
        }
        else if(option.value=="Python"){
          editorRef.current.setOption("mode","text/x-python");
        }

      })

      var themeSelect=document.getElementById("Theme");
      
      themeSelect.addEventListener("change",function(){
        console.log(themeSelect.value);
        if(themeSelect.value=="3024-day.css"){
          editorRef.current.setOption("theme","3024-day");
        }
        else if(themeSelect.value=="dracula.css"){
          editorRef.current.setOption("theme","dracula");
        }
        else if(themeSelect.value=="elegant.css"){
          editorRef.current.setOption("theme","elegant");
        }
        else if(themeSelect.value=="midnight.css"){
          editorRef.current.setOption("theme","midnight");
        }

      })

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          initSocketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
            socketId
          });
        }
      });

    }
    if(!editorRef.current){
    init();
    }

    

  }, []); 

  const socket = initSocketRef.current;
  socket.on("codeset", ({ code }) => {
    console.log("hello called");
    if (code !== null) {
      editorRef.current.setValue(code);
    }
  });
 
  return (
    <textarea id="realtimeEditor" defaultValue="text here"/>
  );
};

export default EditorCom;
