import React, { useEffect } from "react";
import { useRef, useState } from "react";


function CreateNote(){
    
    function getHistoryData(){
        let historyData = ""
        JSON.parse(localStorage.getItem(`note`)) && (historyData = JSON.parse(localStorage.getItem(`note`))) 
        console.log(`prevData:`,historyData)
        return historyData
    }
        
    const [noteContent,setNoteContent] = useState(getHistoryData())
    const note = useRef(null);

    useEffect(()=>{
        localStorage.setItem(`note`,JSON.stringify(noteContent))
        console.log(`saving`,JSON.stringify(noteContent))

    },[noteContent])

    function handleEdit(){
        console.log(note.current.value)
        setNoteContent(note.current.value)
    }
    function handleClear(){
        note.current.value = ""
        setNoteContent(note.current.value)
    }

    return (
        <div  className="w-full h-full relative">
            <button className="absolute w-16 italic font-bold bg-orange-300 rounded top-2 right-2 shadow transition transform active:scale-90 hover:bg-orange-400" onClick={handleClear}>Clear</button>
            <textarea ref={note} defaultValue={noteContent} type="text" onChange={handleEdit} className="w-full h-full p-4 text-lg"></textarea>
        </div>
    )
}


export default CreateNote