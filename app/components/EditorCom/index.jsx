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

const EditorCom = ({ roomId, onCodeChange, socketId, setEditorRefToParent }) => {
  const editorRef = useRef(null);
  const initSocketRef = useRef(initSocket);

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
      editorRef.current.setValue("Hello World");
      var option = document.getElementById("Lang_Option");

      option.addEventListener("change", function () {
        if (option.value == "Java") {
          editorRef.current.setOption("mode", "text/x-java");
        } else if (option.value == "C") {
          editorRef.current.setOption("mode", "text/x-csrc");
        } else if (option.value == "Cpp") {
          editorRef.current.setOption("mode", "text/x-c++src");
        } else if (option.value == "Python") {
          editorRef.current.setOption("mode", "text/x-python");
        }
        const  mode =  editorRef.current.getOption('mode')

        initSocketRef.current.emit("setlang", {roomId,mode});
        // console.log("lang emit occured", editorRef.current.getOption('mode'));
      });

      var themeSelect = document.getElementById("Theme");

      themeSelect.addEventListener("change", function () {
        // console.log(themeSelect.value);
        if (themeSelect.value == "3024-day.css") {
          editorRef.current.setOption("theme", "3024-day");
        } else if (themeSelect.value == "dracula.css") {
          editorRef.current.setOption("theme", "dracula");
        } else if (themeSelect.value == "elegant.css") {
          editorRef.current.setOption("theme", "elegant");
        } else if (themeSelect.value == "midnight.css") {
          editorRef.current.setOption("theme", "midnight");
        }
      });

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          initSocketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
            socketId,
          });
        }
      });

      initSocketRef.current.on("getlang", ({mode}) =>{
        if(mode == "text/x-java"){
         option.value = "Java";
        }
        else if(mode == "text/x-csrc"){
          option.value = "C";
        }
        else if(mode == "text/x-c++src"){
          option.value = "Cpp";
        }
        else if( mode == "text/x-python"){
          option.value = "Python";
        }
        editorRef.current.setOption("mode", mode);

      })

      initSocketRef.current.on("codeset", ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });

    }

    if (!editorRef.current) {
      init();
    }
    setEditorRefToParent(editorRef.current);
    
  }, []);

  return <textarea id="realtimeEditor" />;
};

export default EditorCom;
