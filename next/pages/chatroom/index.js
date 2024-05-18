import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Chatroom from '@/components/chatroom'

export default function navbar() {

  const router = useRouter()
  const [rooms,setRooms] = useState()
  const [create,setCreate] = useState(false)

  useEffect(()=>{
    axios.get('http://localhost:3000/api/room')
    .then((res)=>{
      setRooms(res.data)
    })
  },[])
  
  return (
    <div>
        <div onClick={()=>setCreate(true)}>➕</div>
        <div>
          {create && <Chatroom setCreate={setCreate}/>}
        </div>
        <div>
            {
                rooms &&
                rooms.map((room,ind)=>(
                  <div key={ind} style={{backgroundColor: 'lightblue'}} onClick={()=>router.push(`/chatroom/${room._id}`)}>
                      <div>
                        <h1>{room.name}</h1>
                      </div>
                      <div>
                        <Image src={room.image} width={50} height={50} alt='room_image'/>
                      </div>
                      <div>
                        <>{room.description}</>
                      </div>
                  </div>
                ))
            }
        </div>
    </div>
  )
}