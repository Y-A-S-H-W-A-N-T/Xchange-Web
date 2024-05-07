import { useState } from "react"
import axios from "axios"
import { storage } from "../config.js"
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"

export default function home() {
    const [image,setImage] = useState(null)
    const [chatroom,setChatRoom] = useState({
        name: '',
        description: '',
    })
    const Create = async()=>{
        if(chatroom.name==='') return alert("Enter name before uploading image")
        if(!image)
        {
            alert("ADD IMAGE")
            return false
        }
        const Img_ref = ref(storage,chatroom.name)
        uploadBytes(Img_ref,image)
        .then((res)=>{
            getDownloadURL(res.ref)
            .then(async(link)=>{
                await axios.post('http://localhost:3000/api/create_room',{name: chatroom.name, description: chatroom.description, image: link})
                .then((res)=>{
                    res.data.status===200? alert("Room Created") : alert("Room was not created due to some issue")
                })
            })
        })
    }

    return (
      <div>
            <div>
                <input placeholder="Room name" onChange={(e)=>setChatRoom((prev)=>({...prev,name: e.target.value}))}/>
                <input placeholder="description" onChange={(e)=>setChatRoom((prev)=>({...prev,description: e.target.value}))}/>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                <button onClick={Create}>CREATE</button>
            </div>
      </div>
    )
  }