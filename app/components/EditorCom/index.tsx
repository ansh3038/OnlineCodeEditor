// "use client";
// import React, { useEffect } from 'react'
//  import Codemirror from 'codemirror'
// //import {EditorView, basicSetup} from "codemirror"
// import 'codemirror/mode/javascript/javascript'
// import 'codemirror/theme/dracula.css'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/addon/edit/closetag'
// import 'codemirror/addon/edit/closebrackets.js'

// const EditorCom = () => {

//   useEffect(()=>{
//       async function init(){
          
//         Codemirror.fromTextArea(document.getElementById('realtimeEditor'),{
//             mode: {name: 'javascript', json:true},
//             theme:'dracula',
//             autoCloseTags: true,
//             autoCloseBrackets: true,
//             lineNumbers: true
//         });
//       }

//       init();

//   }, [])

//   return (
//      <textarea id="realtimeEditor" defaultValue="text here"></textarea>
//   )
// }

// export default EditorCom






"use client"; // Not sure what this line is intended for, but it seems unnecessary in a React component file.

import React, { useEffect } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets.js';

const EditorCom = () => {
  useEffect(() => {
    // Initialize CodeMirror in the useEffect hook
    const textarea = document.getElementById('realtimeEditor');
    if (textarea instanceof HTMLTextAreaElement){

      
          const editor = Codemirror.fromTextArea(textarea, {
            mode: { name: 'javascript', json: true }, // Use 'name' property instead of 'name'
            theme: 'dracula',
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineNumbers: true
          });

          // Cleanup function to remove CodeMirror instance when component unmounts
          return () => {
            editor.toTextArea(); // Dispose CodeMirror instance
          };
      }
  }, []); // Dependency array is empty because this effect runs only once on component mount

  return (
    // Using defaultValue prop for initial value of textarea
    <textarea id="realtimeEditor" defaultValue="text here"></textarea>
  );
};

export default EditorCom;
