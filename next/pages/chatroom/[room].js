import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
import { storage } from '../../config';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import styles from '../../styles/room.module.css';

const socket = io('http://localhost:8000/');

export default function Home() {
  const router = useRouter();
  const { room } = router.query;
  const [media, setMedia] = useState('');
  const [vtu, setVtu] = useState(null);
  const [oldMessages, setOldMessages] = useState([{}]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let vtu = localStorage.getItem('vtu');
    const VTU = vtu.replace(/^"(.*)"$/, '$1');
    setVtu(VTU);
    socket.emit('connected', room);
    socket.on('pastMessages', past => {
      setOldMessages(past);
      console.log(past);
    });
  }, [message]);

  const SEND = () => {
    if(media==='' && message==='') return
    socket.emit('chat', {
      room_id: room,
      message: message,
      media: media,
      sender_vtu: vtu,
    });
    setMessage('');
  };

  const handleImage = image => {
    const Img_ref = ref(storage, `/messages/${vtu}/`);
    uploadBytes(Img_ref, image).then(res => {
      getDownloadURL(res.ref).then(async link => {
        setMedia(link);
      });
    });
  };

  console.log(media);

  return (
    <>
    <div className={styles.chatContainer}>
      <div style={{paddingBottom: '60px'}}>
        {oldMessages.map((val, ind) =>{
          if(vtu===val.sender_vtu)
            {
              return(
                <div className={styles.message_box} style={{marginLeft: '50%'}}>
                    <div key={ind} className={styles.messageContainer}>
                      <div className={styles.message}>
                        <p>
                          {val.message}
                        </p>
                      </div>
                      {val.media && <Image style={{marginLeft: '50%'}} src={val.media} width={200} height={200} />}
                    </div>
                </div>
              )
            }
            else{
              return(
                <div className={styles.message_box}>
                    <div key={ind} className={styles.messageContainer}>
                      {val.sender_vtu}:
                      <div className={styles.message} style={{width: '50%'}}>
                        <p>
                          {val.message}
                        </p>
                      </div>
                      {val.media && <Image src={val.media} width={100} height={100} />}
                    </div>
                </div>
              )
            }
        })}
      </div>
    </div>
    <div className={styles.send_field}>
        <div className={styles.inputContainer}>
          <input type='file' onChange={e => handleImage(e.target.files[0])} id="fileInput"/>
          <label htmlFor="fileInput">Send an image</label>
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
  </>
  );
}
