import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Card from '../styles/card.module.css'
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function home() {

  const router = useRouter();

  const Logout = ()=>{
    localStorage.removeItem('vtu')
    localStorage.removeItem('name')
    router.replace('/')
  }

  const [vtu,setVtu] = useState('')

  const user = useSelector(state=> state.user)
  console.log(user)

  useEffect(()=>{
    let vtu = localStorage.getItem('vtu')
    setVtu(vtu)
    // vtu === null ? router.replace('/') : ''
    // create a model which asks you to Login first, before entering the site.
  })

  if(vtu===null){
    return (
      <div>
        <Link href='/'>GO TO HOME</Link>
      </div>
    )
  }

  return (
    <div>
        {vtu && <div>
          <div className={Card.exit}>
            <div onClick={Logout}><img alt='logout' src='./exit.png' height={80} width={80}/></div>
          </div>
            <div className={Card.functionalities}>
              <div className={Card.card} onClick={()=>router.push('/chatroom')}>
                <div className={Card.card_content}>
                  <p className={Card.card_title}>Locker room</p>
                  <p className={Card.card_description}>Create chat rooms and join with friends to chat.</p>
                </div>
                <div className={Card.card_image}>
                  <Image src='/lockerroom.jpg' alt='locker_room_img' height={500} width={500} priority={true}/>
                </div>
              </div>
              <div className={Card.card} onClick={()=>router.push('/news')}>
                <div className={Card.card_content}>
                  <p className={Card.card_title}>College News</p>
                  <p className={Card.card_description}>Read and Upload college news.</p>
                </div>
                <div className={Card.card_image}>
                  <Image src='/news.jpg' alt='locker_room_img' height={500} width={500} priority={true}/>
                </div>
              </div>
              <div className={Card.card} onClick={()=>router.push('/communities')}>
                <div className={Card.card_content}>
                  <p className={Card.card_title}>Community</p>
                  <p className={Card.card_description}>Join communities, Post things</p>
                </div>
                <div className={Card.card_image}>
                  <Image src='/community.jpg' alt='locker_room_img' height={500} width={500} priority={true}/>
                </div>
              </div>
            </div>
        </div>}
    </div>
  )
}