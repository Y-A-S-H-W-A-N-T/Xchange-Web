import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Chatroom from '@/components/chatroom'
import styles from '../../styles/locker.module.css'

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/room')
  const lockers = await response.json()
  return { props: { lockers } }
}

export default function navbar({ lockers }) {

  const router = useRouter()
  const [create,setCreate] = useState(false)
  
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
                            <p className={styles.join} onClick={() => router.push(`/chatroom/${room._id}`)}>join chat</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}