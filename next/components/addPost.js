import { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../config";
import { useRouter } from "next/router";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import styles from "../styles/modal.module.css"
import { addPostToCommunity, resetAddPostStatus } from "./slices/communitySlice";
import { useDispatch, useSelector } from "react-redux";

export default function AddPost({ addpost, togglePostScreen, community_id }) {

    const router = useRouter()

    const [title,setTitle] = useState('')
    const [media,setMedia] = useState('')

    const { addpoststatus } = useSelector(state=> state.communities)

    const dispatch = useDispatch()

    useEffect(()=>{
      if (addpoststatus==='succeeded'){
        togglePostScreen()
        alert("Post Added")
        router.reload()
        dispatch(resetAddPostStatus())
      }
    },[addpoststatus])

    const Post = async()=>{
        const Img_ref = ref(storage, `/community/posts/${title,'-',Date.now()}`);
        uploadBytes(Img_ref, media).then((res) => {
        getDownloadURL(res.ref).then(async (link) => {
            const newPost = {
              community_id: community_id,
              post_title: title,
              post_media:  link
            }
            dispatch(addPostToCommunity(newPost))
        });
        })
    }


  return (
    <div>
      {addpost && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={togglePostScreen}>
              &times;
            </span>
            <h2>Post here</h2>
                <input type="file" style={{display: 'none'}} id="fileInput" onChange={(e)=>setMedia(e.target.files[0])}/>
                <label htmlFor="fileInput">Upload image</label>
                <input type="text" placeholder="Caption" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                <button onClick={Post}>POST</button>
          </div>
        </div>
      )}
    </div>
  );
}
