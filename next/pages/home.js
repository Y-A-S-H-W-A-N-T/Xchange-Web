import { useEffect, useState } from 'react';
import AddRoom from '../components/addroom'
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function home() {
  const router = useRouter();

  const [rooms,setRooms] = useState()

  useEffect(()=>{
    axios.get('http://localhost:3000/api/room')
    .then((res)=>{
      setRooms(res.data)
    })
  },[])
  console.log("ROOMS - > ",rooms)

  const Logout = ()=>{
    localStorage.removeItem('vtu')
    localStorage.removeItem('name')
    router.replace('/')
  }

  return (
    <div>
        <div>
          <div>
            <button onClick={Logout}>LOGOUT</button>
          </div>
            <div>
                <h1>Chat Room</h1>
            </div>
            <div>
                <p>Add Room ➕</p>
            </div>
            <AddRoom/>
            <div>
              {
                rooms &&
                rooms.map((room,ind)=>(
                  <div key={ind} style={{backgroundColor: 'lightblue'}} onClick={()=>router.push(`/chatroom/${room._id}`)}>
                      <div>
                        <h1>{room.name}</h1>
                      </div>
                      <div>
                        <Image src={room.image} width={50} height={50}/>
                      </div>
                      <div>
                        <>{room.name}</>
                      </div>
                  </div>
                ))
              }
            </div>
        </div>
    </div>
  )
}