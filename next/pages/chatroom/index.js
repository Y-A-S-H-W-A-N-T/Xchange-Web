import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Chatroom from '@/components/chatroom'
import styles from '../../styles/locker.module.css'
import Passcode from '@/components/passcode'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms } from '@/components/slices/roomSlice'
import Loading from '@/components/loading'
import { CustomAlert } from  'alerts-react'

export default function navbar() {

  const dispatch = useDispatch()
  const { rooms, status, error } = useSelector(state=> state.rooms)
  const router = useRouter()

  useEffect(()=>{
    dispatch(fetchRooms())
  },[dispatch])


  const [create,setCreate] = useState(false)
  const [privateRoom,setPrivateRoom] = useState({
    pass: false,
    passcode: '',
    input: '',
    id: ''
  })

  const openChats = async(id,ind,pass)=>{
        setPrivateRoom((prev)=>({...prev,passcode: pass, id: id}))
        rooms[ind].private === true ? setPrivateRoom((prev)=>({...prev,pass: true})) : router.push(`/chatroom/${id}`)
  }

  const enterChat = async()=>{
     if (privateRoom.input===privateRoom.passcode)
     {
      router.push(`/chatroom/${privateRoom.id}`)
     }
    else{
      CustomAlert({
        title: 'Wrong Pass Code',
        showCancelButton: false,
        type: 'error'
      })
      setPrivateRoom((prev)=>({...prev,pass: false}))
    }
  }

  const vtu = useSelector(state=> state.user.vtu)

    if(vtu===''){
        return (
        <div>
            {vtu==='' && <h2 onClick={()=>router.replace('/')}>LOGIN FIRST</h2>}
        </div>
        )
    }
  
  return (
  <>
    {status==='loading' && <Loading/>}
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