import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router';

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

    return (
      <div>
        Socket.io <br/>
        <input type='file'/><input placeholder='Type here' onChange={(e)=>setMessage(e.target.value)} value={message}/>
        <button onClick={SEND}>SEND</button>
        <div>
          {
            oldMessages.map((val,ind)=>(
              <div key={ind}>
                  <p>{val.sender_vtu} : </p><p>{val.message}</p>
              </div>
            ))
          }
        </div>
      </div>
    )
}
