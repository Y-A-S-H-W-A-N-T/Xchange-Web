import { useEffect, useState } from 'react';
import AddRoom from '../components/addroom'
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Nav from '../components/navbar'

export default function home() {
  const router = useRouter();

  const [rooms,setRooms] = useState()
  const [create,setCreate] = useState(false)

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

  const toggleModal = ()=>{ setCreate(!create) }

  return (
    <div>
        <div>
          <div className='navbar'>
            <Nav/>
          </div>
          <div>
            <button onClick={Logout}>LOGOUT</button>
          </div>
            <div onClick={()=>setCreate(!create)}>
                <h1>Create ➕</h1>
            </div>
            {create && <AddRoom modal={create} showModal={toggleModal}/>}
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