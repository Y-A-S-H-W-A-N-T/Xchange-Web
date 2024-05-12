import { useEffect, useState } from 'react';
import Create from '../components/create'
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Nav from '../components/navbar'

export default function home() {
  const router = useRouter();

  const [rooms,setRooms] = useState()
  const [create,setCreate] = useState(false)
  const [news,setNews] = useState()

  useEffect(()=>{
    axios.get('http://localhost:3000/api/room')
    .then((res)=>{
      setRooms(res.data)
    })
    axios.get('http://localhost:3000/api/news/show_news')
    .then((res)=>{
      setNews(res.data)
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
            {create && <Create modal={create} showModal={toggleModal}/>}
            <div>
              CHAT ROOMS
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
                        <>{room.description}</>
                      </div>
                  </div>
                ))
              }
            </div>
            <p>-------------------------------------</p>
            <div>
              News
              {
                news &&
                news.map((news,ind)=>(
                  <div key={ind} style={{backgroundColor: 'lightblue'}}>
                      <div>
                        <h1>{news.headline}</h1>
                      </div>
                      <div>
                        <Image src={news.image} width={400} height={200}/>
                      </div>
                      <div>
                        <>{news.description}</>
                      </div>
                  </div>
                ))
              }
            </div>
        </div>
    </div>
  )
}