import { useEffect, useState } from 'react';
import Create from '../components/create'
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import Card from '../styles/card.module.css'

export default function home() {
  const router = useRouter();

  const [rooms,setRooms] = useState()
  const [create,setCreate] = useState(false)
  const [news,setNews] = useState()
  const [VTU,setVTU] = useState()

  useEffect(()=>{
    let vtu = localStorage.getItem('vtu');
    const new_vtu = vtu.replace(/^"(.*)"$/, '$1');
    setVTU(new_vtu);
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
          <div>
            <div onClick={Logout}><img alt='logout' src='./exit.png' height={50} width={50}/></div>
          </div>
            <div onClick={()=>setCreate(!create)}>
                <h1>Create ➕</h1>
            </div>
            {create && <Create modal={create} showModal={toggleModal}/>}
            <div className={Card.functionalities}>
              <div className={Card.card} onClick={()=>router.push('/chatroom')}>
                <div className={Card.card_content}>
                  <p className={Card.card_title}>Locker room</p>
                  <p className={Card.card_description}>Create chat rooms and join with friends to chat.</p>
                </div>
                <div className={Card.card_image}>
                  <img src='./lockerroom.jpg' alt='locker_room_img'/>
                </div>
              </div>
              <div className={Card.card} onClick={()=>router.push('/news')}>
                <div className={Card.card_content}>
                  <p className={Card.card_title}>College News</p>
                  <p className={Card.card_description}>Read and Upload college news.</p>
                </div>
                <div className={Card.card_image}>
                  <img src='./news.jpg' alt='locker_room_img'/>
                </div>
              </div>
              <div className={Card.card} onClick={()=>router.push('/communities')}>
                <div className={Card.card_content}>
                  <p className={Card.card_title}>Community</p>
                  <p className={Card.card_description}>Join communities, Post things</p>
                </div>
                <div className={Card.card_image}>
                  <img src='./community.jpg' alt='locker_room_img'/>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}