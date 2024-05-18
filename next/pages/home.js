import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import Card from '../styles/card.module.css'

export default function home() {

  const router = useRouter();

  const Logout = ()=>{
    localStorage.removeItem('vtu')
    localStorage.removeItem('name')
    router.replace('/')
  }

  return (
    <div>
        <div>
          <div>
            <div onClick={Logout}><img alt='logout' src='./exit.png' height={50} width={50}/></div>
          </div>
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