import { useState } from "react"
import axios from "axios"

export default function home() {
    const [chatroom,setChatRoom] = useState({
        image: null,
        name: '',
        description: ''
    })

    const Create = async()=>{
        const formdata = new FormData()
        formdata.append('image',chatroom.image)
        formdata.append('name',chatroom.name)
        formdata.append('description',chatroom.description)
        await axios.post('http://localhost:8000/create-room',formdata)
        .then((res)=>{
            if(res.data.message==='room_created') alert("Room Created")
            else alert("Error in Creating Room")
            
        })
    }

    return (
      <div>
            <div>
                <input placeholder="Room name" onChange={(e)=>setChatRoom((prev)=>({...prev,name: e.target.value}))}/>
                <input placeholder="description" onChange={(e)=>setChatRoom((prev)=>({...prev,description: e.target.value}))}/>
                <input type="file" onChange={(e)=>setChatRoom((prev)=>({...prev,image: e.target.files[0]}))}/>
                <button onClick={Create}>CREATE</button>
            </div>
      </div>
    )
  }