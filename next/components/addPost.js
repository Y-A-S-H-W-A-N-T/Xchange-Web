import { useState } from "react";
import axios from "axios";
import { storage } from "../config";
import { useRouter } from "next/router";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import styles from "../styles/modal.module.css"

export default function AddPost({ addpost, togglePostScreen, community_id }) {

    const router = useRouter()

    const [title,setTitle] = useState('')
    const [media,setMedia] = useState('')

    const Post = async()=>{
        const Img_ref = ref(storage, `/community/posts/${title,'-',Date.now()}`);
        uploadBytes(Img_ref, media).then((res) => {
        getDownloadURL(res.ref).then(async (link) => {
            console.log(link)
            await axios
            .post("/api/community/upload_post", {
                community_id: community_id,
                title: title,
                media: link
            })
            .then((res) => {
                res.data.status === 200
                ? alert("Posted")
                : alert("Error in Posting")
                router.reload();
            });
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
                <input type="text" placeholder="title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                <button onClick={Post}>POST</button>
          </div>
        </div>
      )}
    </div>
  );
}
