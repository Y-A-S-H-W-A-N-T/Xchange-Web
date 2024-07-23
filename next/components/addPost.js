import { useEffect, useState } from "react";
import { storage } from "../config";
import { useRouter } from "next/router";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import styles from "../styles/post.module.css";
import { addPostToCommunity, resetAddPostStatus } from "./slices/communitySlice";
import { useDispatch, useSelector } from "react-redux";
import { CustomAlert } from  'alerts-react'

export default function AddPost({ addpost, togglePostScreen, community_id }) {

    const router = useRouter();
    const [title, setTitle] = useState('');
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(false);
    const { addpoststatus } = useSelector(state => state.communities);
    const dispatch = useDispatch();

    useEffect(() => {
        if (addpoststatus === 'succeeded') {
            togglePostScreen();
            router.reload();
            dispatch(resetAddPostStatus());
        }
    }, [addpoststatus])

    const user = useSelector(state=> state.user.vtu.vtu)

    const Post = async () => {
        if (!title || !media) {
            return CustomAlert({
                description: 'Title and Media field is required'
            })
        }

        setLoading(true);
        const Img_ref = ref(storage, `/community/posts/${title}-${Date.now()}`);
        uploadBytes(Img_ref, media).then((res) => {
            getDownloadURL(res.ref).then(async (link) => {
                const newPost = {
                    community_id: community_id,
                    post_title: title,
                    post_media: link,
                    post_vtu: user
                }
                console.log("posting - ",newPost)
                dispatch(addPostToCommunity(newPost));
                setLoading(false)
            }).catch(() => setLoading(false));
        }).catch(() => setLoading(false));
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
                        <div className={styles.formGroup}>
                            <input type="file" style={{ display: 'none' }} id="fileInput" onChange={(e) => setMedia(e.target.files[0])} />
                            <label htmlFor="fileInput" className={styles.fileLabel}>Upload image</label>
                            {media && <p>{media.name}</p>}
                            <input type="text" placeholder="Caption" onChange={(e) => setTitle(e.target.value)} value={title} className={styles.inputField} />
                        </div>
                        <button onClick={Post} className={styles.postButton} disabled={loading}>
                            {loading ? "Posting..." : "POST"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
