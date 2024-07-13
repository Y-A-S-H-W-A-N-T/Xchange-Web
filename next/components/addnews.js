import { useState, useEffect } from "react";
import axios from "axios";
import { storage } from "../config";
import { useRouter } from "next/router";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import styles from "../styles/modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addNews, fetchNews } from "./slices/newsSlice";

export default function Addnews({ setCreate }) {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [news, setNews] = useState({
    headline: "",
    description: "",
  })
  
  const dispatch = useDispatch()
  const { addstatus} = useSelector(state=> state.news)
  
  useEffect(() => {
    if (addstatus === 'succeeded') {
      dispatch(fetchNews());
      alert('News added successfully!')
      setCreate(false)
    }
  }, [addstatus, dispatch]);

  console.log(addstatus)

  const Create = async () => {
    if (news.headline === "" || news.description === "" || !image) {
      return alert("Fill the necessary details to publish news");
    }

    const imgRef = ref(storage, `/news/${news.headline}-${Date.now()}`);
    uploadBytes(imgRef, image).then((res) => {
      getDownloadURL(res.ref).then(async (link) => {
        // await axios
        //   .post("/api/news/upload_news", {
        //     headline: news.headline,
        //     description: news.description,
        //     image: link,
        //   })
        //   .then((res) => {
        //     res.data.status === 200
        //       ? alert("News Uploaded")
        //       : alert("News was not uploaded due to some issue");
        //     router.reload();
        //   });
        const newNews = {
          headline: news.headline,
          description: news.description,
          image: link,
        }
        dispatch(addNews(newNews))
      });
    });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => setCreate(false)}>
          &times;
        </span>
        <h2>NEWS</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Headline"
            onChange={(e) =>
              setNews((prev) => ({ ...prev, headline: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="News"
            onChange={(e) =>
              setNews((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={Create}>CREATE</button>
        </div>
      </div>
    </div>
  );
}
