"use client"; // Not sure what this line is intended for, but it seems unnecessary in a React component file.

import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/mode/clike/clike";
const EditorCom = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize CodeMirror in the useEffect hook
    const textarea = document.getElementById("realtimeEditor");
    if (textarea instanceof HTMLTextAreaElement) {
      const editor = Codemirror.fromTextArea(textarea, {
        mode: "text/x-java", // Use 'name' property instead of 'name'
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        indentWithTabs: true,
      });

      editor.setSize("100%", "100%");
      // Cleanup function to remove CodeMirror instance when component unmounts
      return () => {
        editor.toTextArea(); // Dispose CodeMirror instance
      };
    }
  }, []); // Dependency array is empty because this effect runs only once on component mount

  return (
    // Using defaultValue prop for initial value of textarea
    <textarea
      id="realtimeEditor"
      defaultValue="text here"
      className="h-100"
    ></textarea>
  );
};

export default EditorCom;
