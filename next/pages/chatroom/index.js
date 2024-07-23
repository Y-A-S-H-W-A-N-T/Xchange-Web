import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Chatroom from '@/components/chatroom'
import styles from '../../styles/locker.module.css'
import Passcode from '@/components/passcode'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms } from '@/components/slices/roomSlice'
import { auth } from '@/components/slices/userSlice'

// export async function getStaticProps() {
//   const response = await fetch('http://localhost:3000/api/room')
//   const lockers = await response.json()
//   return { props: { lockers } }
// }

export default function navbar({ lockers }) {

  const dispatch = useDispatch()
  const { rooms, status, error } = useSelector(state=> state.rooms) // manage errors, add loading screen
  const router = useRouter()

  useEffect(()=>{
    dispatch(fetchRooms())
  },[dispatch])

  console.log(rooms)

  const user = useSelector(state=> state.user)
  console.log(user)

  const [create,setCreate] = useState(false)
  const [privateRoom,setPrivateRoom] = useState({
    pass: false,
    passcode: '',
    input: '',
    id: ''
  })

  const openChats = async(id,ind,pass)=>{
        setPrivateRoom((prev)=>({...prev,passcode: pass, id: id})) // setting id for private room
        rooms[ind].private === true ? setPrivateRoom((prev)=>({...prev,pass: true})) : router.push(`/chatroom/${id}`)
  }

  const enterChat = async()=>{
     if (privateRoom.input===privateRoom.passcode)
     {
      router.push(`/chatroom/${privateRoom.id}`)
      dispatch(auth(privateRoom.passcode))
     }
    else{
      alert("Incorrect Passcode")
      setPrivateRoom((prev)=>({...prev,pass: false}))
    }
  }

  const vtu = useSelector(state=> state.user.vtu)

    console.log(vtu)

    if(vtu===''){
        return (
        <div>
            {vtu==='' && <h2 onClick={()=>router.replace('/')}>LOGIN FIRST</h2>}
        </div>
        )
    }
  
  return (
  <>
    {vtu && <div className={styles.container}>
    <div className={styles.createButton} onClick={() => setCreate(true)}><img src='./add.png' alt='create_room' height={50} width={50}/></div>
            <div>
                {create && <Chatroom setCreate={setCreate} />}
            </div>
            <div className={styles.roomsContainer}>
                {rooms && rooms.map((room, ind) => (
                    <div 
                        key={ind} 
                        className={styles.roomCard} 
                    >
                        <div className={styles.roomHeader}>
                            <h1 className={styles.roomName}>{room.name}</h1>
                        </div>
                        <div className={styles.roomDescription}>
                            <p className={styles.pub_pri}>{room.private ? '🔒' : '' }</p>
                            <p className={styles.join} onClick={()=>openChats(room.id,ind,room.passcode)}>join chat</p>
                        </div>
                    </div>
                ))}
            </div>
            {privateRoom.pass && <Passcode setPrivateRoom={setPrivateRoom} enterChat={enterChat}/>}          
  </div>}
  </>
  )
}