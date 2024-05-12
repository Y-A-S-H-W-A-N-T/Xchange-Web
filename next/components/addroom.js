import { useState } from "react";
import axios from "axios";
import { storage } from "../config.js";
import { useRouter } from "next/router";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import styles from "../styles/modal.module.css"
import Chatroom from "../components/chatroom.js";

export default function Home({ modal, showModal }) {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [chatroom, setChatRoom] = useState({
    name: "",
    description: "",
  })

  const toggleModal = () => {
    showModal()
  };

  const Create = async () => {
    if (chatroom.name === "") return alert("Enter name before uploading image");
    if (!image) {
      alert("ADD IMAGE");
      return false;
    }
    const Img_ref = ref(storage, chatroom.name);
    uploadBytes(Img_ref, image).then((res) => {
      getDownloadURL(res.ref).then(async (link) => {
        await axios
          .post("/api/room", {
            name: chatroom.name,
            description: chatroom.description,
            image: link,
          })
          .then((res) => {
            res.data.status === 200
              ? alert("Room Created")
              : alert("Room was not created due to some issue");
            router.reload();
          });
      });
    });
    toggleModal()
  };

  return (
    <div>
      {modal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={toggleModal}>
              &times;
            </span>
            <h2>Create Room, Upload News, Community</h2>
            <Chatroom/>
          </div>
        </div>
      )}
      {/* End of Modal */}
    </div>
  );
}
