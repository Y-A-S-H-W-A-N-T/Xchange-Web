import { useState } from "react";
import axios from "axios";
import { storage } from "../config";
import { useRouter } from "next/router";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import styles from "../styles/modal.module.css"

export default function Addnews({ setCreate }) {
    
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [news, setnews] = useState({
    headline: "",
    description: "",
  })
  const Create = async () => {
    if (news.name === "" || image==null) return alert("Fill the necessary details to publish news")
    if (!image) {
      alert("ADD IMAGE");
      return false;
    }
const Img_ref = ref(storage, `/news/${news.name,'-',Date.now()}`);
    uploadBytes(Img_ref, image).then((res) => {
      getDownloadURL(res.ref).then(async (link) => {
        await axios
          .post("/api/news/upload_news", {
            headline: news.headline,
            description: news.description,
            image: link,
          })
          .then((res) => {
            res.data.status === 200
              ? alert("News Upload")
              : alert("News was not upload due to some issue");
            router.reload();
          });
      });
    })
  };
  return (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <span className={styles.close} onClick={()=>setCreate(false)}>
              &times;
            </span>
            <div>
            <h2>NEWS</h2>
            <div>
                <input
                placeholder="Headline"
                onChange={(e) =>
                    setnews((prev) => ({ ...prev, headline: e.target.value }))
                }
                />
                <input
                placeholder="News"
                onChange={(e) =>
                    setnews((prev) => ({
                    ...prev,
                    description: e.target.value,
                    }))
                }
                />
                <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                />
                <button onClick={Create}>CREATE</button>
            </div>
            </div>
        </div>
  </div>
  )
}