import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useRouter } from 'next/router'
import { storage } from "../../config"
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import Image from 'next/image'

const socket = io('http://localhost:8000/')

export default function Home() {

  const router = useRouter()
  const { room } = router.query
  const [media,setMedia] = useState('')
  const [vtu,setVtu] = useState(null)
  const [oldMessages,setOldMessages] = useState([{}])
  const [message,setMessage] = useState('')

    useEffect(() => {
      let vtu = localStorage.getItem('vtu')
      const VTU = vtu.replace(/^"(.*)"$/, '$1')
      setVtu(VTU)
        socket.emit('connected',room)
        socket.on('pastMessages',past=>{
          setOldMessages(past)
          console.log(past)
        })

    },[message]);

    const SEND = ()=>{
      socket.emit('chat',{
        room_id: room,
        message: message,
        media: media,
        sender_vtu: vtu
      })
      setMessage('')
    }

    const handleImage = (image)=>{
      const Img_ref = ref(storage,`/messages/${vtu}/`)
        uploadBytes(Img_ref,image)
        .then((res)=>{
            getDownloadURL(res.ref)
            .then(async(link)=>{
                setMedia(link)
            })
        })
    }

    console.log(media)

    return (
      <div>
        Socket.io <br/>
        <input type='file' onChange={(e)=>handleImage(e.target.files[0])}/><label>Send an image</label>
        {media && <Image src={media} width={50} height={50}/>}
        <input placeholder='Type here' onChange={(e)=>setMessage(e.target.value)} value={message}/>
        <button onClick={SEND}>SEND</button>
        <div>
          {
            oldMessages.map((val,ind)=>(
              <div key={ind}>
                  <p>{val.sender_vtu} : </p><p>{val.message} {val.media && <Image src={val.media} width={50} height={50}/>}</p>
              </div>
            ))
          }
        </div>
      </div>
    )
}
