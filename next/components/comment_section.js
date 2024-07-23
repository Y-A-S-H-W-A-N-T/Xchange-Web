import { useEffect, useState } from "react"
import styles from "../styles/modal.module.css"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchCommunities } from "./slices/communitySlice"

export default function Coment_Section({ setShowComments, post_id, community_number, community_id, post_number }) {

  const dispatch = useDispatch()

  const Post = useSelector(state=> state.communities.communities[community_number].posts[post_number].post_comments)

  const user = useSelector(state=> state.user.vtu.vtu)

  const [comment,setComment] = useState({
    comment_sender: user,
    comment_payload: '',
    post_id: post_id,
    community_id: community_id
  })
  console.log("Comment", comment)

  const Send_message = async()=>{
    await axios.post('/api/community/comment',comment)
    .then((res) => {
      res.data.status === 200
      ? dispatch(fetchCommunities())
      : ''
      setComment((prev)=>({...prev,comment_payload: ''}))
    });
  }


  return (
    <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={()=>setShowComments(false)}>
              &times;
            </span>
            <p>
              {
                Post.map((comment,ind)=>(
                  <div key={ind}>
                      <p>{comment.sender_vtu} : {comment.comment}</p>
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