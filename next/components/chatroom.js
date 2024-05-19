import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/router";
import styles from "../styles/modal.module.css"

export default function chatroom({ setCreate }) {
    
  const router = useRouter();
  const [chatroom, setChatRoom] = useState({
    name: "",
    description: "",
  })
  const Create = async () => {
    if (chatroom.name === "" || chatroom.description === '') return alert("Enter name before uploading image");
    await axios
    .post("/api/room", {
      name: chatroom.name,
      description: chatroom.description,
    })
    .then((res) => {
      res.data.status === 200
        ? alert("Room Created")
        : alert("Room was not created due to some issue");
      router.reload();
    });
  };
  return (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <span className={styles.close} onClick={()=>setCreate(false)}>
              &times;
            </span>
            <div>
            <div>
                <input
                placeholder="Room name"
                onChange={(e) =>
                    setChatRoom((prev) => ({ ...prev, name: e.target.value }))
                }
                />
                <input
                placeholder="Description"
                onChange={(e) =>
                    setChatRoom((prev) => ({
                    ...prev,
                    description: e.target.value,
                    }))
                }
                />
                <button onClick={Create}>CREATE</button>
            </div>
            </div>
        </div>
  </div>
  )
}