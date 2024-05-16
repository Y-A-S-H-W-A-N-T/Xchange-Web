import { useEffect, useState } from "react"
import styles from "../styles/modal.module.css"
import axios from "axios"

export default function Coment_Section({ setShowComments, post_id, post, community_id, post_number }) {

  const [comment,setComment] = useState({
    comment_sender: '',
    comment_payload: '',
    post_id: post_id,
    community_id: community_id
  })
  console.log("Comment", comment)

  useEffect(()=>{
    let vtu = localStorage.getItem('vtu');
    const VTU = vtu.replace(/^"(.*)"$/, '$1');
    setComment((prev)=>({...prev, comment_sender: VTU}))
  },[])

  const Send_message = async()=>{
    await axios.post('/api/community/comment',comment)
    .then((res) => {
      res.data.status === 200
      ? console.log(res.data.response)
      : alert(res.data.response)
      setComment((prev)=>({...prev,comment_payload: ''}))
    });
  }


  return (
    <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={()=>setShowComments(false)}>
              &times;
            </span>
            {console.log("sadadadsd", post.posts[post_number].post_comments)}
            <p>
              {
                post.posts[post_number].post_comments.map((comment,ind)=>(
                  <div key={ind}>
                      <p>{comment.comment}</p>
                  </div>
                ))
              }
            </p> 
            <input placeholder="comment" value={comment.comment_payload} onChange={(e)=>setComment((prev)=>({...prev,comment_payload: e.target.value}))}/>
            <button onClick={Send_message}>send</button>
          </div>
        </div>
  )
}