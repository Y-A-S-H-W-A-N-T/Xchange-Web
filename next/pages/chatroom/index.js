import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Chatroom from '@/components/chatroom'
import styles from '../../styles/locker.module.css'
import Passcode from '@/components/passcode'

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/room')
  const lockers = await response.json()
  return { props: { lockers } }
}

export default function navbar({ lockers }) {

  const router = useRouter()
  const [create,setCreate] = useState(false)
  const [privateRoom,setPrivateRoom] = useState({
    pass: false,
    passcode: '',
    room_id: '',
  })

  const openChats = async(id,ind)=>{
        setPrivateRoom((prev)=>({...prev,room_id: id}))
        lockers[ind].private === true ? setPrivateRoom((prev)=>({...prev,pass: true})) : router.push(`/chatroom/${id}`)
  }

  const enterChat = async()=>{
    await axios
    .post('/api/room/enter_room',{ room_id: privateRoom.room_id, pass: privateRoom.passcode })
    .then((res)=>{
        res.data.status === 200 ? router.push(`/chatroom/${privateRoom.room_id}`) : alert('Wrong pass')
    })
    setPrivateRoom((prev)=>({...prev,pass: false}))
  }
  
  return (
<div className={styles.container}>
            <div className={styles.createButton} onClick={() => setCreate(true)}><img src='./add.png' alt='create_room' height={50} width={50}/></div>
            <div>
                {create && <Chatroom setCreate={setCreate} />}
            </div>
            <div className={styles.roomsContainer}>
                {lockers && lockers.map((room, ind) => (
                    <div 
                        key={ind} 
                        className={styles.roomCard} 
                    >
                        <div className={styles.roomHeader}>
                            <h1 className={styles.roomName}>{room.name}</h1>
                        </div>
                        <div className={styles.roomDescription}>
                            <p>{room.description}</p>
                            <p>{room.private ? 'Private' : 'Public' }</p>
                            <p className={styles.join} onClick={()=>openChats(room._id,ind)}>join chat</p>
                        </div>
                    </div>
                ))}
            </div>
            {privateRoom.pass && <Passcode setPrivateRoom={setPrivateRoom} enterChat={enterChat}/>}
        </div>
  )
}