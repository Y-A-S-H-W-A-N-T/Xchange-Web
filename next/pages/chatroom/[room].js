import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
import { storage } from '../../config';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import styles from '../../styles/room.module.css';
import { useSelector } from 'react-redux';
import Loading from '@/components/loading';

const socket = io('http://localhost:8000/')

export default function Home() {

  const router = useRouter();
  const { room } = router.query;
  const [media, setMedia] = useState('')
  const [oldMessages, setOldMessages] = useState([{}]);
  const [message, setMessage] = useState('')

  const vtu = useSelector(state=> state.user.vtu.vtu)

  useEffect(() => {
    socket.emit('connected', room);
    socket.on('pastMessages', past => {
      setOldMessages(past)
    })
  });

  const SEND = () => {
    if(media==='' && message==='') return
    socket.emit('chat', {
      room_id: room,
      message: message,
      media: media,
      sender_vtu: vtu,
    })
    setMessage('')
    setMedia('')
  };

  const handleImage = image => {
    const Img_ref = ref(storage, `/messages/${vtu}/${Date.now()}`);
    uploadBytes(Img_ref, image).then(res => {
      getDownloadURL(res.ref).then(async link => {
        setMedia(link);
      });
    });
  }

  const user = useSelector(state=> state.user.vtu)

    if(user===''){
        return (
        <div>
            {user==='' && <h2 onClick={()=>router.replace('/')}>LOGIN FIRST</h2>}
        </div>
        )
    }

  return (
    <>
      {!oldMessages && <Loading/>}
      {user && <>
      <div className={styles.chatContainer}>
      <div style={{paddingBottom: '60px'}}>
        {oldMessages.map((val, ind) =>{
          if(vtu===val.sender_vtu)
            {
              return(
                <div className={styles.message_box} style={{marginLeft: '50%'}}>
                    <div key={ind} className={styles.messageContainer}>
                      {
                        val.message!=='' && 
                        <div className={styles.messageBox}>
                          <div className={styles.message}>
                            <p>
                              {val.message}
                            </p>
                          </div>
                        </div>
                      }
                    </div>
                    {val.media && <Image style={{marginLeft: '50%'}} src={val.media} width={200} height={200} />}
                </div>
              )
            }
            else{
              return(
                <div className={styles.message_box} key={ind}>
                    <div key={ind} className={styles.messageContainer}>
                      {val.sender_vtu}:
                      {
                        val.message!=='' &&
                        <div className={styles.message} style={{width: '40%'}}>
                          <p>
                            {val.message}
                          </p>
                        </div>
                      }
                    </div>
                    {val.media && <Image src={val.media} width={100} height={100} />}
                </div>
              )
            }
        })}
      </div>
    </div>
    <div className={styles.send_field}>
        <div className={styles.inputContainer}>
          <input type='file' onChange={e => handleImage(e.target.files[0])} id="fileInput"/>
          <label htmlFor="fileInput">📸</label>
          <input
            placeholder='Type here'
            onChange={e => setMessage(e.target.value)}
            value={message}
            type='text'
          />
          <button onClick={SEND}>SEND</button>
        </div>
        <div>
          {media && <Image src={media} width={50} height={50} />}
        </div>
      </div>
      </>}
    </>
  );
}
